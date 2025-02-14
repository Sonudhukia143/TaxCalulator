import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import loginUser from '../routes/login.js';
import logout from '../routes/logout.js';
import signinuser from '../routes/signup.js';
import calculateTax from '../routes/calculatetax.js';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Error in establishing connection with the database: " + error);
    }
};

const app = express();
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173','https://checktax.netlify.app'],   
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api/login', loginUser);
app.use('/api/signin', signinuser);
app.use('/api/logout', logout);
app.use('/api/calculatetax', calculateTax);
app.get('/api/test', (req,res) => {
    res.json("Hello, The Backend Is Working");
});
app.use('*', (req, res) => {
    res.status(404).send("Could not find the page");
});

  export default async function handler (req, res) {
      await connectDb();

     return app(req, res);
  }; 


