import { APIGatewayProxyHandler } from 'aws-lambda';

export const lambdaHandler: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!'
    })
  };
};
