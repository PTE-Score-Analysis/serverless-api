// getAllQuestions.test.mjs
import { getAllQuestionsHandler } from '../../../src/handlers/getAllQuestions.mjs';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

describe('Test getAllQuestionsHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    // test case: DB has 2 questions
    it('should return all questions', async () => {
        const mockQuestions = [{ question: 'Question 1' }, { question: 'Question 2' }];

        // if ScanCommand is used, these items will be returned
        ddbMock.on(ScanCommand).resolves({
            Items: mockQuestions,
        });

        const event = { 
            httpMethod: 'GET' 
        };

        // call the function to be tested
        const result = await getAllQuestionsHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(mockQuestions),
        };

        // make comparison between expectedResult and real results
        expect(result).toEqual(expectedResult);
    });

    // test case: DB has no question
    it('should return an empty array', async () => {
        const mockQuestions = [];

        // if ScanCommand is used, these items will be returned
        ddbMock.on(ScanCommand).resolves({
            Items: mockQuestions,
        });

        const event = { 
            httpMethod: 'GET' 
        };

        // call the function to be tested
        const result = await getAllQuestionsHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(mockQuestions),
        };

        // make comparison between expectedResult and real results
        expect(result).toEqual(expectedResult);
    });

    // test case: handling exceptions from the database
    it('should handle exceptions from the database', async () => {
        // set an exception for ScanCommand
        ddbMock.on(ScanCommand).rejects(new Error('Database error'));

        const event = { 
            httpMethod: 'GET' 
        };

        const result = await getAllQuestionsHandler(event);

        const expectedResult = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Database error' }),
        };

        expect(result).toEqual(expectedResult);
    });
});
