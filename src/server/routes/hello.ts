import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';

const schema = defineSchema({
});

export default defineRoute('get', '/hello', schema, async (req, res) => {
  console.log('요청옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  return res.send('ㅎㅇㅎㅇ');
});
