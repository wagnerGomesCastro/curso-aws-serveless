#HOST=http://0.0.0.0:3000
HOST=https://bicbmyn6f4.execute-api.us-east-1.amazonaws.com

curl -X POST \
    --silent \
    -H 'Content-Type: application/json' \
    --data '{"username": "wagner.castro", "password": "123"}' \
    $HOST/dev/login
   

