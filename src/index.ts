import 'reflect-metadata';
import 'dotenv/config';
import {createConnection} from 'typeorm';

async function run() {
  const connection = await createConnection();

  await connection.synchronize(true);

  console.log('ㅎㅎ');
}

run().then().catch((e) => console.log(e));
