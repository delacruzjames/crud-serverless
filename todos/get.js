'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: 'todos',
    Key: {
      id: event.pathParameters.id
    }
  }

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not fetch the todo item."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response)
  });
}
