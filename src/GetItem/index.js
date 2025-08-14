const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = process.env.ITEMS_TABLE_NAME;
    const id = event.pathParameters?.id;
    
    if (!id) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Validation error',
                message: 'Item ID is required'
            })
        };
    }
    
    try {
        const params = {
            TableName: tableName,
            Key: {
                id: id
            }
        };
        
        const result = await dynamodb.get(params).promise();
        
        if (!result.Item) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Item not found',
                    message: `Item with ID ${id} does not exist`
                })
            };
        }
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                item: result.Item
            })
        };
    } catch (error) {
        console.error('Error getting item:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Could not retrieve item',
                message: error.message
            })
        };
    }
};