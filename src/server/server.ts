import express from 'express';
import cookieParser from 'cookie-parser';
import {registerRoutes} from '../common/utils/express';
import {errorHandler} from './middleware/errorHandler';

export async function startServer() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // app.use(auth());

  await registerRoutes(app, __dirname + '/routes');

  app.use(errorHandler());

  app.listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}
