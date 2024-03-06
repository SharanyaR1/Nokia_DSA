from flask import Flask,request,jsonify
import os
import shutil

app=Flask(__name__)


@app.route('/deployinprod',methods=['POST'])
def deploy():
    try:

        proj=request.get_json()
        cmd=os.system('helm install '+proj['project_name']+' --version 0.1.0 oci://registry-1.docker.io/dsanokia/'+proj['project_name'])
        if cmd==0:
            return jsonify({'Result':'Deployed Successfully'})
        else:
            return jsonify({'Result':'Deployment Failure'})
    except:

        return jsonify({'Result':'Deployment Failure'})










if __name__=='__main__':
    app.run(port=5001)








# {"project_name":"ambani"}