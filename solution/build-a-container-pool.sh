#!/bin/bash

MODULE_PATH=$1
TAG=$2
DEPLOYMENT_NAME=$(echo "$2" | sed 's/_/--/g' | sed 's/\..*//g')

docker build --build-arg INJECT_MODULE=$MODULE_PATH --quiet -f ./solution/DockerfileForRedirection -t $TAG .
minikube image load $TAG:latest
cat ./solution/k8s-deployment.yml | NAME=$DEPLOYMENT_NAME TAG=$2 envsubst | kubectl apply -f -
sleep 5
cat ./solution/k8s-service.yml | NAME=$DEPLOYMENT_NAME envsubst | kubectl apply -f -

function signal_handler() {
  kubectl delete deployment $DEPLOYMENT_NAME
  kubectl delete service $DEPLOYMENT_NAME
}

trap signal_handler SIGTERM
trap signal_handler EXIT

minikube service $DEPLOYMENT_NAME --url
