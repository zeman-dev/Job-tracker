import express from 'express';
import "dotenv/config";
import cors from "cors";
import { connectMongoDB } from './src/db/connectMongoDB.js';
import helmet from 'helmet';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { notFoundHandler } from './src/middleware/notFoundHandler.js';
import { errors } from 'celebrate';

const app = express();

// {LIBRARIES} //
 app.use(helmet());

 app.use(cors());

 app.use(logger());
 
 app.use(express.json());

 // {ROUTES} //



 // {ERROR MIDLEWARE} //

 app.use(notFoundHandler);

 app.use(errors());

 app.use(errorHandler);

// {CONNECTION TO DB} //

await connectMongoDB();

app.listen(process.env.PORT, () =>{
    console.log(`Server is running at http://localhost:${process.env.PORT}/`);
});