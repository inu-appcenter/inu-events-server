import {z} from 'zod';
import {defineSchema} from '../libs/schema';
import {defineRoute} from '../libs/route';
import {ThisWillNeverHappen} from '../../common/errors/general';

const schema = defineSchema({
  query: {
    name: z.string(),
  }
});

export default defineRoute('get', '/zod', schema, async (req, res) => {
  const {name} = req.query;

  if (name.length > 10) {
    throw ThisWillNeverHappen();
  }

  return res.send(`당신 이름은 ${name}`);
});
