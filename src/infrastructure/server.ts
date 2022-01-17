import express from 'express';
import cookieParser from 'cookie-parser';
import hello from '../routes/hello';
import bye from '../routes/bye';

export async function startServer() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // app.use(auth());

  app.use(hello);
  app.use(bye);

  app.listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}
