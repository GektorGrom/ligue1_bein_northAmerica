#!/bin/bash

$AWS_ID
AWS_ID=$(aws sts get-caller-identity --output text --query Account)
if [ $AWS_ID = 082604792641 ]
then
  aws s3 cp dist s3://ligue1-us-schedule/ --recursive --acl public-read
  aws cloudfront create-invalidation --distribution-id E39STSDWAB2PKG --paths "/index.html"
else
  echo check you default AWS profile
fi
