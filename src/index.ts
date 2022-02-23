import 'reflect-metadata';
import 'dotenv/config';
import {startTypeORM} from './infrastructure/db';
import {startServer} from './server/server';
import {startScheduler} from './scheduled/scheduler';
import {log} from './common/utils/log';

async function run() {
  await startTypeORM();
  log(`TypeORM 시작!`);

  await startScheduler();
  log(`스케줄러 시작!`);

  await startServer();
  log(`서버 시작!`);
}

run().then().catch((e) => log(e));
