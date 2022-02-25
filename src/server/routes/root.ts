import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import SpecStorage from '../libs/SpecStorage';
import swagger from 'swagger-ui-express';
import {RequestHandler} from 'express';
import {log} from '../../common/utils/log';

const schema = defineSchema({
});

let handler: RequestHandler;

export default defineRoute('get', '/', schema, async (req, res, next) => {
  if (handler == null) {
    log('문서를 생성합니다!');

    handler = swagger.setup(await SpecStorage.generateOpenApi());
  }

  return handler(req, res, next);
});
