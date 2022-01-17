import {z} from 'zod';
import {defineSchema} from '../libs/schema';
import {defineRoute} from '../libs/route';

const schema = defineSchema({
  query: {
    name: z.string(),
  }
});

export default defineRoute('get', '/zod', schema, async (req, res) => {
  const {name} = req.query;

  return res.send(`당신 이름은 ${name}`);
});
