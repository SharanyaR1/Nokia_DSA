import subprocess

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

# Replace '<your_helm_release>' with the actual Helm release name
helm_release = 'uness'
if check_pods_status(helm_release):
    print(f"All pods in Helm deployment '{helm_release}' are running.")
else:
    print(f"Not all pods in Helm deployment '{helm_release}' are running.")