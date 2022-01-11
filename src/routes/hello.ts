import * as Router from '@koa/router';

const router = new Router();

router.get('/hello', async (ctx) => {
  console.log('요청옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  ctx.body = 'ㅎㅇㅎㅇ';
});

export default router;
