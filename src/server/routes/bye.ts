import express from 'express';

const router = express.Router();

router.get('/bye', async (req, res) => {
  console.log('요청옴########################');

  res.send('ㅂㅇㅂㅇ');
});

export default router;
