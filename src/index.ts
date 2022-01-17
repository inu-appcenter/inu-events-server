import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';

async function run() {
  // const connection = await createConnection();
  // await connection.synchronize(true);

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // app.use(auth());

  app.get('/', (req, res, next) => {
   // 본 로직
    res.send();
  });


  app.listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}

run().then().catch((e) => console.log(e));
