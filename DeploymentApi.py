from flask import Flask,request,jsonify
import os
import shutil

app=Flask(__name__)


@app.route('/deployinprod',methods=['POST'])
def deploy():
    proj=request.get_json()
    os.system('helm install '+proj['project_name']+' --version 0.1.0 oci://registry-1.docker.io/dsanokia/'+proj['project_name'])

    return jsonify({'Result':'Deployed Successfully'})











if __name__=='__main__':
    app.run(port=5001)








# {"project_name":"ambani"}