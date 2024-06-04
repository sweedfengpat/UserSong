import 'reflect-metadata';
import express from 'express';
import userRouter from "./routes/user";
import songRouter from "./routes/song";
import { AppDataSource } from './data-source';

export const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  app.use('/users', userRouter);
  app.use('/songs', songRouter);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });