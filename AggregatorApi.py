from flask import Flask,request,jsonify
import os
import yaml
import shutil
app=Flask(__name__)


@app.route("/aggregate",methods=['POST'])
def aggregate():
    
        
    names=request.get_json()
    
    current_dir = os.getcwd()
    project_path=os.path.join(current_dir,names["project_name"])
    os.makedirs(project_path, exist_ok=True)
    os.chdir(project_path)
    os.system('helm create '+names["project_name"]+"-charts")
    charts_path=os.path.join(current_dir,names["project_name"],names["project_name"]+"-charts","charts")
    os.chdir(charts_path)
    images_dir=os.path.join(current_dir,names["project_name"],"images")
    os.makedirs(images_dir, exist_ok=True)
    for i in names["charts"]:
        os.system("helm pull oci://registry-1.docker.io/dsanokia/"+i+" --untar")
        values_yaml_path = os.path.join(current_dir,names["project_name"],names["project_name"]+"-charts","charts", i, 'values.yaml')
         # Read the values.yaml file
        with open(values_yaml_path, 'r') as file:
            yaml_data = yaml.safe_load(file)
    
        # Update the replica number in the YAML data
        yaml_data['replicaCount'] = names["charts"][i]
    
        # Write the updated YAML data back to the file
        with open(values_yaml_path, 'w') as file:
            yaml.dump(yaml_data, file)
        image_repository = yaml_data.get('image', {}).get('repository', '')

          # Pull Docker image based on the image repository path
        if image_repository:
            os.system(f"docker pull {image_repository}")
         # Move pulled Docker image to the images folder
            image_name = os.path.basename(image_repository)
            images_folder = os.path.join(current_dir, names["project_name"], "images")
            
            os.system(f"docker save {image_repository} > {os.path.join(images_folder, image_name)}.tar")
    os.chdir(current_dir)
    os.system("tar -cf "+names["project_name"]+".tar "+names["project_name"])
    os.system("helm push "+names["project_name"]+"-0.1.0.tgz oci://registry-1.docker.io/dsanokia/")
    
    print(os.getcwd())
    return jsonify({"Creation":"Successful"}),200
    # except:
    #     return jsonify({"Creation":"Build Error"}),500
if __name__=='__main__':
    app.run()




# {"project_name":"week4","charts":{
#     "ss7lbchart":2,"httplbchart":6
# }}