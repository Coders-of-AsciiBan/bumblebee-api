#!/usr/bin/env bash

aws s3 cp s3://secrets-sasirekha3/api-pdiot/secrets.js secrets.js

zip -r lambda.zip .

aws s3 cp lambda.zip s3://api-pdiot/${GITHUB_RUN_ID}/

{
  aws cloudformation describe-stacks --stack-name api-pdiot

  aws cloudformation update-stack --stack-name api-pdiot \
      --template-body file://cfn.yml \
      --parameters ParameterKey=BuildId,ParameterValue=${GITHUB_RUN_ID} \
      --capabilities CAPABILITY_NAMED_IAM
} || {
  aws cloudformation create-stack --stack-name api-pdiot \
    --template-body file://cfn.yml \
    --parameters ParameterKey=BuildId,ParameterValue=${GITHUB_RUN_ID} \
    --capabilities CAPABILITY_NAMED_IAM
}







