from flask import Flask,request
import os
import yaml
app=Flask(__name__)


@app.route("/aggregate",methods=['POST'])
def aggregate():
    names=request.get_json()
    current_dir = os.getcwd()
    os.system('helm create '+names["project_name"])
    charts_path=os.path.join(current_dir,names["project_name"],"charts")
    os.chdir(charts_path)
    for i in names["charts"]:
        os.system("helm pull oci://registry-1.docker.io/dsanokia/"+i+" --untar")

        values_yaml_path = os.path.join(current_dir,names["project_name"],"charts", i, 'values.yaml')

        # Read the values.yaml file
        with open(values_yaml_path, 'r') as file:
            yaml_data = yaml.safe_load(file)
    
        # Update the replica number in the YAML data
        yaml_data['replicaCount'] = names["charts"][i]
    
        # Write the updated YAML data back to the file
        with open(values_yaml_path, 'w') as file:
            yaml.dump(yaml_data, file)

    os.chdir(current_dir)
    print(current_dir)
    return "done"
if __name__=='__main__':
    app.run()





# {"project_name":"week4","charts":{
#     "ss7lbchart":2,"httplbchart":6
# }}