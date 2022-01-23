import express from 'express';
import cookieParser from 'cookie-parser';
import {authorizer} from './middleware/authorizer';
import {errorHandler} from './middleware/errorHandler';
import {registerRoutes} from '../common/utils/express';

/**
 * 인증을 건너뛰는 endpoint 목록입니다.
 */
const allowList = [
  '/**', // 전체 경로 허용입니다 나중에 빼주세용~
  '/login'
];

export async function startServer() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(authorizer({exclude: allowList}));

  await registerRoutes(app, __dirname + '/routes');

  app.use(errorHandler());

  app.listen(process.env.PORT || 3000);

  console.log('서버시작!!!!!!!!!!');
}
