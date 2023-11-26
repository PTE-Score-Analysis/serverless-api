import { lambdaHandler } from './hello-world';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, Callback } from 'aws-lambda';

describe('lambdaHandler', () => {
  it('should return 200 status code with a Hello World message', async () => {
    const event = {} as APIGatewayProxyEvent;
    const context = {} as Context;
    const callback = (() => {}) as Callback;

    const response = await new Promise<APIGatewayProxyResult>((resolve, reject) => {
      lambdaHandler(event, context, (error, result) => {
        if (error) reject(error);
        else resolve(result as APIGatewayProxyResult);
      });
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ message: 'Hello World!' }));
  });
});