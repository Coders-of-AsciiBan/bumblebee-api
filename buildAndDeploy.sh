#!/usr/bin/env bash

aws s3 cp s3://secrets-sasirekha3/bumblebee-api/secrets.js secrets.js

zip -r lambda.zip .

aws s3 cp lambda.zip s3://bumblebee-api/${GITHUB_RUN_ID}/

{
  aws cloudformation describe-stacks --stack-name bumblebee-api

  aws cloudformation update-stack --stack-name bumblebee-api \
      --template-body file://cfn.yml \
      --parameters ParameterKey=BuildId,ParameterValue=${GITHUB_RUN_ID} \
      --capabilities CAPABILITY_NAMED_IAM
} || {
  aws cloudformation create-stack --stack-name bumblebee-api \
    --template-body file://cfn.yml \
    --parameters ParameterKey=BuildId,ParameterValue=${GITHUB_RUN_ID} \
    --capabilities CAPABILITY_NAMED_IAM
}







