import {defineSchema} from '../libs/schema';
import {defineRoute} from '../libs/route';

const schema = defineSchema({});

export default defineRoute('get', '/me', schema, async (req, res) => {
  const {userId} = req;

  return res.send(`당신 사용자 ID는 ${userId}`);
});
