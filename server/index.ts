require('dotenv').config();
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import cloudRouter from './routes/cloudRoutes';
import cloudinaryRouter from './routes/cloudinaryRoutes'

import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
//  credentials: process.env.CORS_CREDENTIALS === 'true',
 credentials: true
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(userRouter);
app.use(cloudRouter);
app.use(cloudinaryRouter);


app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🎉`);
    });
  } catch (error) {
    console.log('Error', error);
  }
})();
