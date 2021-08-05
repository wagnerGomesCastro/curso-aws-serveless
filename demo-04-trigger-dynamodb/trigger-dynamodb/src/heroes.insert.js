const uuid = require('uuid')

class Handler {
  constructor({
    dynamoDbSvc
  }) {
    this.dynamoDbSvc = dynamoDbSvc
    this.dynamodbTable = process.env.DYNAMODB_TABLE
  }

  async insertItem(params) {
    return this.dynamoDbSvc.put(params).promise()
  }
  prepareData(data) {
    const params = {
      TableName: this.dynamodbTable,
      Item: {
        ...data,
        id: uuid.v1(),
        createdAt: new Date().toISOString()
      }
    }
    return params
  }
  handlerSuccess(data) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    }
    return response
  }
  handleError(data) {
    return {
      statusCode: data.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t create item!!'
    }
  }
  async main(event) {
    try {
      // retorna no formato JSON
      const data = JSON.parse(event.body)

      const dbParams = this.prepareData(data)
      await this.insertItem(dbParams)
      return this.handlerSuccess(dbParams.Item)
    } catch (error) {
      console.error('Deu ruim**', error.stack)
      return this.handleError({
        statusCode: 500
      })
    }
  }
}
//factory
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const handler = new Handler({
  dynamoDbSvc: dynamoDB
})

module.exports = handler.main.bind(handler)
