# Local Development and Testing of AWS Lambda Function

## Overview

This document describes the process for building and testing an AWS Lambda function locally using SAM (Serverless Application Model) and Yarn. It also covers invoking the function via an API endpoint using tools like Postman or Insomnia.

## Build Process

The build process involves compiling the TypeScript code and preparing the Lambda function for local testing. The steps are as follows:

1. **Compile TypeScript Code**
   - Run the following command to compile the TypeScript code into JavaScript:
     ```
     yarn build
     ```

2. **Build SAM Application**
   - Build your SAM application which prepares your function for local testing:
     ```
     sam build
     ```

3. **Start Local API Gateway**
   - Start the local API Gateway to test the function:
     ```
     sam local start-api
     ```

## Testing the Function

After starting the local API Gateway, the function can be tested using HTTP requests.

1. **Invoke the Function**
   - Use a tool like Postman or Insomnia to send a GET request to the following URL:
     ```
     http://127.0.0.1:3000/hello-world
     ```

2. **Expected Response**
   - The function should return the following response:
     ```
     Hello World!
     ```

## Flow Diagram

```mermaid
graph LR
    A[Yarn Build] -->|Compile TypeScript| B[SAM Build]
    B -->|Build SAM Application| C[SAM Local Start-API]
    C --> D{Test API using Postman/Insomnia}
```

## Notes

- Ensure you have Yarn, AWS SAM CLI, and a tool like Postman or Insomnia installed.
- Replace `http://127.0.0.1:3000/hello-world` with your function's endpoint if it's different.
- The response "Hello World!" assumes that your Lambda function is programmed to return this string.
