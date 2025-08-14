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
        const body = JSON.parse(event.body);
        
        const getParams = {
            TableName: tableName,
            Key: {
                id: id
            }
        };
        
        const existingItem = await dynamodb.get(getParams).promise();
        
        if (!existingItem.Item) {
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
        
        const updatedItem = {
            ...existingItem.Item,
            ...body,
            id: id,
            updatedAt: new Date().toISOString()
        };
        
        const updateParams = {
            TableName: tableName,
            Item: updatedItem
        };
        
        await dynamodb.put(updateParams).promise();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Item updated successfully',
                item: updatedItem
            })
        };
    } catch (error) {
        console.error('Error updating item:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Could not update item',
                message: error.message
            })
        };
    }
};