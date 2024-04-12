from flask import Flask,request,jsonify
import os
import shutil
import subprocess

app=Flask(__name__)






@app.route('/checkstatus')
def checkstatus():
    helm_release = 'uness'
    try:
       # Run kubectl get pods command for the specified Helm release
       cmd = f'kubectl get pods --namespace default -l app.kubernetes.io/instance={helm_release} '
       
       result = subprocess.run(cmd, shell=True, capture_output=True,text=True, check=True)
       print(result.stdout)
       # Check if all pods are in the "Running" state
       
       #  and len(set(result.stdout.split()))!=1
       print("Deploying..")
       return {'result':result.stdout}
    except Exception as e:
           print(f"Error checking pods status: {e}")
           return {"Error":e}

# Replae '<your_helm_release>' with the actual Helm release name
    
    
        
   
    






if __name__=='__main__':
    app.run(port=5002)








# {"project_name":"ambani"}