# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is an AWS Serverless Application Model (SAM) based REST API for items management. The architecture consists of:

- **API Gateway**: Handles REST endpoints with CORS support
- **5 Lambda Functions**: Each function handles a specific CRUD operation (ListItems, CreateItem, GetItem, UpdateItem, DeleteItem)
- **DynamoDB Table**: Stores items with 'id' as the primary key, using PAY_PER_REQUEST billing
- **X-Ray Tracing**: Enabled across all functions and API Gateway

Each Lambda function is isolated in its own directory under `src/` with individual `package.json` files. All functions use Node.js 22.x runtime and AWS SDK v2 with DynamoDB DocumentClient.

## Common Commands

### Build and Deploy
```bash
sam build                # Build the application
sam deploy              # Deploy to AWS (use --guided for first deployment)
sam validate            # Validate SAM template
```

### Local Development
```bash
sam local start-api     # Start API locally at http://localhost:3000
sam local invoke [FunctionName] -e events/event.json  # Test individual functions
```

### Development Workflow
```bash
npm run build          # Alias for sam build
npm run deploy         # Alias for sam deploy
npm run local          # Alias for sam local start-api
npm run validate       # Alias for sam validate
npm run clean          # Remove .aws-sam build artifacts
```

## API Endpoints

- `GET /items` - List all items (handled by ListItems function)
- `POST /items` - Create new item (handled by CreateItem function)
- `GET /items/{id}` - Get single item (handled by GetItem function)
- `PUT /items/{id}` - Update existing item (handled by UpdateItem function)
- `DELETE /items/{id}` - Delete item (handled by DeleteItem function)

## Lambda Function Structure

Each Lambda function follows the same pattern:
- Uses AWS SDK v2 (`aws-sdk` package)
- Accesses DynamoDB table via `ITEMS_TABLE_NAME` environment variable
- Returns standardized JSON responses with CORS headers
- Includes comprehensive error handling with appropriate HTTP status codes
- CreateItem function generates UUIDs and includes `createdAt`/`updatedAt` timestamps

## Configuration Files

- `template.yaml` - SAM template defining all AWS resources
- `samconfig.toml` - SAM configuration with deployment settings
- Individual `package.json` in each function directory for dependencies
- Root `package.json` for project-level scripts and dev dependencies

## Deployment Status

**Current Stack**: `generation-app` deployed in `us-east-1`
**Stack Status**: `CREATE_COMPLETE` 
**API Base URL**: `https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod`
**Last Deployment**: Successfully deployed with Node.js 22.x runtime

### Deployed Resources:
- 5 Lambda Functions (ListItems, CreateItem, GetItem, UpdateItem, DeleteItem)
- API Gateway REST API with CORS enabled
- DynamoDB table named `Items` 
- IAM roles with appropriate permissions for each function
- X-Ray tracing enabled

### Testing the API:
```bash
# List all items
curl -X GET "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items"

# Create an item
curl -X POST "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"A test item"}'

# Get specific item (replace {id} with actual ID)
curl -X GET "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}"

# Update an item
curl -X PUT "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","description":"Updated description"}'

# Delete an item
curl -X DELETE "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}"
```