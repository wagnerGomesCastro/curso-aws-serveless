# bash scripts/s3/upload-file.sh meu-bucket test.txt

BUCKETNAME=$1
FILE_PATH=$2


aws \
    --endpoint-url=http://localhost:4566  s3 cp $FILE_PATH s3://$BUCKETNAME
aws \
    --endpoint-url=http://localhost:4566  s3 ls s3://$BUCKETNAME
