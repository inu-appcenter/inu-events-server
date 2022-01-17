import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import bye from './routes/bye';
import hello from './routes/hello';

async function run() {
  // const connection = await createConnection();
  // await connection.synchronize(true);

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // app.use(auth());

  app.use(hello);
  app.use(bye);

  app.listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}

run().then().catch((e) => console.log(e));
