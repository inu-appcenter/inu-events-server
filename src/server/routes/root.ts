import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import SpecStorage from '../libs/SpecStorage';
import swagger from 'swagger-ui-express';

const schema = defineSchema({
});

export default defineRoute('get', '/', schema, (req, res, next) => {
  const handler = swagger.setup(SpecStorage.generateOpenApi());

  return handler(req, res, next);
});
