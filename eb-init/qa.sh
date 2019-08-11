#!/bin/bash -e

if [ -z $AWS_ACCESS_KEY_ID ];then
  echo "Please set the environment variable AWS_ACCESS_KEY_ID in your repository settings (Settings/Pipelines/Environment Variables)"
  exit 1
fi
if [ -z $AWS_SECRET_ACCESS_KEY ];then
  echo "Please set the environment variable AWS_SECRET_ACCESS_KEY in your repository settings (Settings/Pipelines/Environment Variables)"
  exit 1
fi
if [ -z $QA_AWS_REGION ];then
  echo "Please set the environment variable QA_AWS_REGION in your repository settings (Settings/Pipelines/Environment Variables)"
  exit 1
fi
if [ -z $QA_APPLICATION_NAME ];then
  echo "Please set the environment variable QA_APPLICATION_NAME in your repository settings (Settings/Pipelines/Environment Variables)"
  exit 1
fi
if [ -z $QA_APPLICATION_ENV ];then
  echo "Please set the environment variable QA_APPLICATION_ENV in your repository settings (Settings/Pipelines/Environment Variables)"
  exit 1
fi

mkdir -p ~/.aws
printf "[profile eb-cli]
aws_access_key_id = %s
aws_secret_access_key = %s
" $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY > ~/.aws/config

mkdir -p /opt/atlassian/pipelines/agent/build/.elasticbeanstalk
printf "
branch-defaults:
  default:
    environment: %s
global:
  application_name: %s
  default_region: %s
  profile: eb-cli
  sc: git
" $QA_APPLICATION_ENV $QA_APPLICATION_NAME $QA_AWS_REGION > /opt/atlassian/pipelines/agent/build/.elasticbeanstalk/config.yml