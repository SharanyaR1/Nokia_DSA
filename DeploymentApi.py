from flask import Flask,request,jsonify
import os
import shutil
import subprocess
import json
from logging.config import dictConfig
app=Flask(__name__)

#THIS IS FOR LOGGING IT WRITES THE LOGS TO A FILE CALLED deployment.log
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
            "file": {

                "class": "logging.FileHandler",
                "filename": "deployment.log",
                "formatter": "default",

            },
           
        },
        
        "root": {"level": "DEBUG", "handlers": ["console","file"]},
    }
)


def check_pods_status(helm_release):
    try:
        # Run kubectl get pods command for the specified Helm release
        while True:

            cmd = f'kubectl get pods --namespace default -l app.kubernetes.io/instance={helm_release} -o jsonpath="{{.items[*].status.phase}}"'
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
            print(result)
            # Check if all pods are in the "Running" state
            if set(result.stdout.split())== {'Running'} and len(set(result.stdout.split()))==1: 
                print("Successful")
                return True
            #  and len(set(result.stdout.split()))!=1
            print("Deploying..")
        

    except subprocess.CalledProcessError as e:
        print(f"Error checking pods status: {e}")
        return False



# STEP 3 TEST IN PRE PRODUCTION ENVIRONMENT
@app.route('/deployinprod',methods=['POST'])
def deploy():
    try:

        proj=request.get_json()
        current_dir = os.getcwd()
        config_dir = os.path.join(current_dir, 'config-files')
        with open(os.path.join(config_dir, 'images-config.json'), 'r') as file:
            image_config = json.load(file)
        repository_url = image_config['url']
        cmd=os.system('helm install '+proj['project_name']+' --version 0.1.0 oci://'+repository_url+'/'+proj['project_name']+"-charts")
        if cmd==0:
            # helm_release = 'uness'
            # The release name of helm in helm install command 
            helm_release = proj['project_name']
            if check_pods_status(helm_release):
                print(f"All pods in Helm deployment '{helm_release}' are running.")
                return jsonify({'Result':'Deployed Successfully'})
            else:
                print(f"Not all pods in Helm deployment '{helm_release}' are running.")
                return jsonify({'Result':'Deployment Failure'})
            
        else:
            return jsonify({'Result':'Deployment Failure'})
        
    except Exception as e:

        return jsonify({'Result':'Deployment Failure',"LogError":e})




    
    
        
   
    






if __name__=='__main__':
    app.run(port=5001)








# {"project_name":"ambani"}