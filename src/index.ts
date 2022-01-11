import 'reflect-metadata';
import 'dotenv/config';
import * as Koa from 'koa';
import * as Router from '@koa/router';

async function run() {
  // const connection = await createConnection();
  // await connection.synchronize(true);

  const app = new Koa();
  const router = new Router();

  router.get('/hello', async (ctx) => {
    console.log('요청옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    ctx.body = 'ㅎㅇㅎㅇ';
  });

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}

run().then().catch((e) => console.log(e));
