const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = process.env.ITEMS_TABLE_NAME;
    
    try {
        const params = {
            TableName: tableName
        };
        
        const result = await dynamodb.scan(params).promise();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                items: result.Items,
                count: result.Count
            })
        };
    } catch (error) {
        console.error('Error listing items:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Could not retrieve items',
                message: error.message
            })
        };
    }
};