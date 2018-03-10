'use strict';

const uuid = require('uuid')
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
console.log("TODOS/CREATE")
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string') {
    console.error("Validation Failed");
    callback(new Error('Could not create todo item'));
    return;
  }


  const params = {
    TableName: 'todos',
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createAt: timestamp,
      updateAt: timestamp
    }
  }
  dynamodb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Could not create todo item'));
      return;
    }

    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify("Succesfully created")
      // body: JSON.stringify(results.Item)
    }
    callback(null, response)
  })
};
