const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = process.env.ITEMS_TABLE_NAME;
    
    try {
        const body = JSON.parse(event.body);
        
        if (!body.name) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Validation error',
                    message: 'Name is required'
                })
            };
        }
        
        const item = {
            id: uuidv4(),
            name: body.name,
            description: body.description || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...body
        };
        
        const params = {
            TableName: tableName,
            Item: item
        };
        
        await dynamodb.put(params).promise();
        
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Item created successfully',
                item: item
            })
        };
    } catch (error) {
        console.error('Error creating item:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Could not create item',
                message: error.message
            })
        };
    }
};