import 'reflect-metadata';
import 'dotenv/config';
import * as Koa from 'koa';

import helloRoutes from './routes/hello';
import byeRoutes from './routes/bye';
// 여기에 추가

async function run() {
  // const connection = await createConnection();
  // await connection.synchronize(true);

  const app = new Koa();

  app
    .use(helloRoutes.routes()).use(helloRoutes.allowedMethods())
    .use(byeRoutes.routes()).use(byeRoutes.allowedMethods())
    // 여기에 추가
    .listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}

run().then().catch((e) => console.log(e));
