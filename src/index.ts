import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import userRouter from "./routes/user";
import songRouter from "./routes/song";
import { User } from "./entity/User";
import { Song } from "./entity/Song";

const app = express();
app.use(express.json());

createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Song],
  synchronize: true,
}).then(connection => {
  app.use('/users', userRouter);
  app.use('/songs', songRouter);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch(error => console.log(error));
