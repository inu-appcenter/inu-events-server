import * as Router from '@koa/router';

const router = new Router();

router.get('/bye', async (ctx) => {
  console.log('요청옴########################');
  ctx.body = 'ㅂㅇㅂㅇ';
});

export default router;
