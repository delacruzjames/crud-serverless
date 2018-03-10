'use strict';

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: 'todos'
}

module.exports.list = (event, context, callback) => {
  dynamodb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not fetch the todos"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
    callback(null, response)
  })
}
