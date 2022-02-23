import 'reflect-metadata';
import 'dotenv/config';
import {startTypeORM} from './infrastructure/db';
import {startServer} from './server/server';
import {startScheduler} from './scheduled/scheduler';

async function run() {
  await startTypeORM();
  await startScheduler();
  await startServer();
}

run().then().catch((e) => console.log(e));
