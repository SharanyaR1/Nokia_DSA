#To decode the auth part in secret
import base64

base64_encoded_content = "ewoJImF1dGhzIjogewoJCSJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOiB7fQoJfSwKCSJjcmVkc1N0b3JlIjogImRlc2t0b3AiLAoJImN1cnJlbnRDb250ZXh0IjogImRlZmF1bHQiLAoJInBsdWdpbnMiOiB7CgkJIi14LWNsaS1oaW50cyI6IHsKCQkJImVuYWJsZWQiOiAidHJ1ZSIKCQl9Cgl9Cn0="

decoded_content = base64.b64decode(base64_encoded_content).decode("utf-8")
print(decoded_content)



#STEPS TO CREATE KUBERNETES SECRETS
#docker login -u <username> -p <password>
#kubectl create secret generic <secret_name> --from-file=.dockerconfigjson=<path_to_docker_config_file> --type=kubernetes.io/dockerconfigjson
#Secret will be stored in /root/.docker/congif.json
#To view the secrets.. kubectl get secrets <secret_name> -o json