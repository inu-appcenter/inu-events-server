import express from 'express';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middleware/errorHandler';
import {registerRoutes} from '../common/utils/express';
import {userIdGetterAssigner} from './middleware/userIdGetterAssigner';
import jsonReplacer from './middleware/jsonReplacer';
import {recorder} from './middleware/recorder';
import swagger from 'swagger-ui-express';

export async function startServer() {
  const app = express();

  app.set('json replacer', jsonReplacer);

  app.use(swagger.serve);
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(userIdGetterAssigner());

  app.use(recorder());

  await registerRoutes(app, __dirname + '/routes');

  app.use(errorHandler());

  app.listen(process.env.PORT || 3000);
}
