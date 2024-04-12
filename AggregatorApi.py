from flask import Flask, request, jsonify,send_file
import os
import yaml
import json

app = Flask(__name__)


#STEP 1 CREATE BUNDLE
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





    # # Mount Docker config secret into the container
    # os.environ['DOCKER_CONFIG'] = '/root/.docker'
    # os.system('mkdir -p /root/.docker && chmod 0700 /root/.docker')
    # #credlogin is the secret name
    # if os.system('kubectl get secret credlogin -o jsonpath="{.data.\.dockerconfigjson}" | base64 -l cr--decode > /root/.docker/config.json'):
    #     print("success")
    # else:
    #     print("Not success")




    
    # Read image repository URLs from images-config.json
    config_dir = os.path.join(current_dir, 'config-files')
    with open(os.path.join(config_dir, 'images-config.json'), 'r') as file:
        image_config = json.load(file)
    repository_url = image_config['url']
    repository=image_config['repository']
    for i in data["charts"]:
        # Pull Helm charts using the repository URL from config
        imagename=image_config['images'][i]['name']
        os.system(f"helm pull oci://{repository_url}/{imagename}chart --untar")
        
        values_yaml_path = os.path.join(current_dir, data["project_name"], data["project_name"] + "-charts", "charts", imagename+'chart', 'values.yaml')
        
        # Check if values.yaml file exists for the chart
        if not os.path.exists(values_yaml_path):
            print(f"Values.yaml file not found for chart '{i}'. Skipping...")
            continue
        
        # Read the values.yaml file
        with open(values_yaml_path, 'r') as file:
            yaml_data = yaml.safe_load(file)
    
        # Update the replica number in the YAML data
        yaml_data['replicaCount'] = data["charts"][i]
        
        # Write the updated YAML data back to the file
        with open(values_yaml_path, 'w') as file:
            yaml.dump(yaml_data, file)
        
        image_repository = repository+'/'+imagename
        
        # Pull Docker image based on the image repository path
        if image_repository:
            os.system(f"docker pull {image_repository}")
            
            # Move pulled Docker image to the images folder
            image_name = os.path.basename(image_repository)
            images_folder = os.path.join(current_dir, data["project_name"], "images")
            os.system(f"docker save {image_repository} > {os.path.join(images_folder, image_name)}.tar")

    # Change directory to the parent directory of the project directory
    os.chdir(current_dir)
    
    # Generate Helm package
    os.system("tar -cf "+data["project_name"]+"-0.1.0.tar "+data["project_name"])
    os.system("helm package "+data["project_name"]+"/"+data["project_name"]+"-charts")
    # Push Helm charts to the repository using the repository URL from config
    #os.system(f"helm push {data['project_name']}.tar oci://{repository_url}/")
    
    print(os.getcwd())
    return jsonify({"Creation": "Successful"}), 200



# STEP 2 PUSH TO REPOSITORY
@app.route('/pushtorepo',methods=['POST'])
def pushingtorepo():
    data = request.get_json()
    current_dir = os.getcwd()
    config_dir = os.path.join(current_dir, 'config-files')
    with open(os.path.join(config_dir, 'images-config.json'), 'r') as file:
        image_config = json.load(file)
    repository_url = image_config['url']
    os.system(f"helm push {data['project_name']}-charts-0.1.0.tgz oci://{repository_url}/")
    return jsonify({'PushToRepo':'Successful'})




@app.route('/download')
def download():
    # tarball name
    path = 'boss-0.1.0.tar'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run()


"""
{"project_name":"Project4",
"version":"0.1.0","charts":{
"SS7LB":2,"HTTPLB":6
}}
"""
