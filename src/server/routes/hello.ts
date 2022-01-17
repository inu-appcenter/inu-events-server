import express from 'express';

const router = express.Router();

router.get('/hello', async (req, res) => {
  console.log('요청옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  res.send('ㅎㅇㅎㅇ');
});

export default router;
