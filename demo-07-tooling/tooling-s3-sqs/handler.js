'use strict';
const AWS = require('aws-sdk')
const host = process.env.LOCALSTACK_HOST || "localhost"
const s3port =  process.env.S3_PORT || "4566"
const s3config = {
  s3ForcePathStyle: true,
  endpoit: new AWS.Endpoint(`https://${host}:${s3port}`)
}

const S3 = new AWS.S3(s3config)

module.exports.hello = async (event) => {
  const allBuckets = await S3.listBuckets().promise()
  console.log('allBuckets', allBuckets)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Heelo 4',
        // input: event,
      },
      null,
      2
    ),
  };
};
