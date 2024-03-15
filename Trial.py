from flask import Flask, request, jsonify
import os
import yaml
import shutil

app = Flask(__name__)

@app.route("/aggregate", methods=['POST'])
def aggregate():
    try:
        data = request.get_json()
        project_name = data["project_name"]
        charts = data["charts"]

        current_dir = os.getcwd()

        # Create Helm chart
        os.system('helm create ' + project_name)
        charts_path = os.path.join(current_dir, project_name, "charts")
        os.makedirs(charts_path, exist_ok=True)
        os.chdir(charts_path)

        # Pull charts and update replica count
        for chart, replicas in charts.items():
            os.system("helm pull oci://registry-1.docker.io/dsanokia/" + chart + " --untar")
            values_yaml_path = os.path.join(current_dir, project_name, "charts", chart, 'values.yaml')

            # Read the values.yaml file
            with open(values_yaml_path, 'r') as file:
                yaml_data = yaml.safe_load(file)

            # Extract the image repository path from values.yaml
            image_repository = yaml_data.get('image', {}).get('repository', '')

            # Pull Docker image based on the image repository path
            if image_repository:
                os.system(f"docker pull {image_repository}")

                # Move pulled Docker image to the images folder
                image_name = os.path.basename(image_repository)
                images_folder = os.path.join(current_dir, project_name, "images")
                os.makedirs(images_folder, exist_ok=True)
                os.system(f"docker save {image_repository} > {os.path.join(images_folder, image_name)}.tar")
                
        # Combine individual image tarballs into a single tarball
        combined_tarball_path = os.path.join(current_dir, project_name, "combined_images.tar")
        images_folder = os.path.join(current_dir, project_name, "images")
        os.chdir(images_folder)
        os.system(f"tar -cf {combined_tarball_path} *.tar")

        # Navigate back to the project directory
        os.chdir(current_dir)

        # Package Helm chart
        os.system(f"helm package {project_name}")

        # Push packaged chart to Docker registry
        os.system(f"helm push {project_name}-0.1.0.tgz oci://registry-1.docker.io/dsanokia/")

        return jsonify({"Creation": "Successful"}), 200

    except Exception as e:
        print(e)
        return jsonify({"Creation": "Build Error"}), 500

if __name__ == '__main__':
    app.run()
