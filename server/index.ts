require('dotenv').config();
import express from 'express';

// GraphQL
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { typeDefs } from './graphql/schema/schema';
import { resolvers } from './graphql/resolvers/resolver';
import { json } from 'body-parser';
// GraphQL

import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser';

const app = express();

// GraphQL
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// GraphQL

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  //  credentials: process.env.CORS_CREDENTIALS === 'true',
  credentials: true
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(userRouter);

app.use(express.urlencoded({ extended: true }));

const initGql = async (server, app) => {
  await server.start();
  app.use('/graphql', json(), expressMiddleware(server));
}

const PORT = 3001;
(async () => {
  try {
    await initGql(server, app);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🎉`);
    });
  } catch (error) {
    console.log('Error', error);
  }
})();
