from flask import Flask,request,jsonify
import os
import shutil
import subprocess

app=Flask(__name__)


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
        cmd=os.system('helm install '+proj['project_name']+' --version 0.1.0 oci://registry-1.docker.io/dsanokia/'+proj['project_name']+"-charts")
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
    except:

        return jsonify({'Result':'Deployment Failure'})



@app.route('/checkstatus')
def checkstatus():
    def check_pods_status(helm_release):
        try:
            # Run kubectl get pods command for the specified Helm release
            cmd = f'kubectl get pods --namespace default -l app.kubernetes.io/instance={helm_release} -o jsonpath="{{.items[*].status.phase}}"'
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
            print(result)
            # Check if all pods are in the "Running" state
            
            #  and len(set(result.stdout.split()))!=1
            print("Deploying..")
            
    
        except subprocess.CalledProcessError as e:
                print(f"Error checking pods status: {e}")
                return False

# Replae '<your_helm_release>' with the actual Helm release name
    helm_release = 'uness'
    if check_pods_status(helm_release):
        print(f"All pods in Helm deployment '{helm_release}' are running.")
    else:
        print(f"Not all pods in Helm deployment '{helm_release}' are running.")
   
    






if __name__=='__main__':
    app.run(port=5001)








# {"project_name":"ambani"}