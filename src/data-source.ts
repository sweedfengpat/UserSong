import { DataSource } from 'typeorm';
import { Users } from './entity/User';
import { Songs } from './entity/Song';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entity/*.ts'],
  synchronize: false,
  logging: false,
});