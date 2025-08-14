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
        
        const deleteParams = {
            TableName: tableName,
            Key: {
                id: id
            }
        };
        
        await dynamodb.delete(deleteParams).promise();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Item deleted successfully',
                deletedItem: existingItem.Item
            })
        };
    } catch (error) {
        console.error('Error deleting item:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Could not delete item',
                message: error.message
            })
        };
    }
};