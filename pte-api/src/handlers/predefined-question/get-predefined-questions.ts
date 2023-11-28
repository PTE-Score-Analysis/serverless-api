import { Client } from 'pg';
import { APIGatewayProxyHandler } from 'aws-lambda';
import dotenv from 'dotenv';

// help get .env variable
dotenv.config();

export const getAllPredefinedQuestions: APIGatewayProxyHandler = async (event, context): Promise<any> => {
    // create a DB client to interact with DB
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        // connect to DB
        await client.connect();

        // use query to get data from DB
        const res = await client.query('SELECT * FROM predefined_question');

        // disconnect from DB
        await client.end();

        // success: return data
        return {
            statusCode: 200,
            body: JSON.stringify(res.rows)
        };
    } catch (err) {
        // failure: log and return error message
        if (err instanceof Error) {
            console.error('Database error', err.stack);
        }
        return {
            statusCode: 500,
            body: 'Error connecting to the database'
        };
    }
};
