from flask import Flask, request, jsonify
import os
import yaml
import subprocess
import json

app = Flask(__name__)

# Load configuration from config.json
with open("config.json", "r") as config_file:
    config = json.load(config_file)

# Check if all necessary keys are present in the config
if "dockerhub_username" not in config or "dockerhub_password" not in config or "registry_url" not in config:
    raise ValueError("Configuration file is missing required fields.")

@app.route("/aggregate", methods=['POST'])
def aggregate():
    data = request.get_json()

    current_dir = os.getcwd()
    project_path = os.path.join(current_dir, data["project_name"])
    os.makedirs(project_path, exist_ok=True)
    os.chdir(project_path)
    os.system('helm create ' + data["project_name"] + "-charts")
    charts_path = os.path.join(current_dir, data["project_name"], data["project_name"] + "-charts", "charts")
    os.chdir(charts_path)
    images_dir = os.path.join(current_dir, data["project_name"], "images")
    os.makedirs(images_dir, exist_ok=True)
    
    for chart_name, replicas in data["charts"].items():
        try:
            # Pull Helm chart
            pull_chart_cmd = f"helm pull oci://{config['registry_url']}/{chart_name} --untar"
            subprocess.run(pull_chart_cmd, shell=True, check=True)

            # Update replica count in values.yaml
            values_yaml_path = os.path.join(charts_path, chart_name, 'values.yaml')
            with open(values_yaml_path, 'r') as file:
                yaml_data = yaml.safe_load(file)
                yaml_data['replicaCount'] = replicas
            with open(values_yaml_path, 'w') as file:
                yaml.dump(yaml_data, file)

            # Pull Docker image
            image_repository = yaml_data.get('image', {}).get('repository')
            if image_repository:
                docker_login_cmd = f"docker login -u {config['dockerhub_username']} -p {config['dockerhub_password']}"
                subprocess.run(docker_login_cmd, shell=True, check=True)
                docker_pull_cmd = f"docker pull {image_repository}"
                subprocess.run(docker_pull_cmd, shell=True, check=True)
                image_name = os.path.basename(image_repository)
                docker_save_cmd = f"docker save {image_repository} > {os.path.join(images_dir, image_name)}.tar"
                subprocess.run(docker_save_cmd, shell=True, check=True)
        except subprocess.CalledProcessError as e:
            return jsonify({"error": str(e)}), 500

    # Create a tar archive
    os.chdir(current_dir)
    tar_cmd = f"tar -cf {data['project_name']}.tar {data['project_name']}"
    os.system(tar_cmd)

    # Push Helm chart
    helm_push_cmd = f"helm push {data['project_name']}-0.1.0.tgz oci://{config['registry_url']}/"
    os.system(helm_push_cmd)

    return jsonify({"Creation": "Successful"}), 200

if __name__ == '__main__':
    app.run()
