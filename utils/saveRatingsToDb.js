const uuid = require("uuid");
const AWS = require("aws-sdk");


const dynamoDb = new AWS.DynamoDB.DocumentClient({});


module.exports = (yelpData, businessName) => {
    const date = JSON.stringify(new Date());
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            businessName: businessName,
            reviews: yelpData.reviews,
            address: yelpData.address,
            phone: yelpData.phone,
            site: yelpData.site,
            scrapedAt: date
        }
    }
    dynamoDb.put(params, error => {
        if(error) {
            console.error(`error saving data to DynamoDB: ${error}`)
            return Promise.reject(`error saving data to DynamoDB: ${error}`)
        } else {
            return Promise.resolve(params.Item)
        }
    })
}