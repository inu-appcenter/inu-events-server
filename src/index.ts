import 'reflect-metadata';
import 'dotenv/config';
import {startTypeORM} from './infrastructure/db';
import {startServer} from './server/server';

async function run() {
  await startTypeORM();
  await startServer();
}

run().then().catch((e) => console.log(e));
