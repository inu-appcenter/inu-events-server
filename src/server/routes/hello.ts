import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import {stringAsDate} from '../libs/zodTypes';

const schema = defineSchema({
  body: {
    aa: stringAsDate
  }
});

export default defineRoute('post', '/hello', schema, async (req, res) => {
  console.log('요청옴!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  console.log(req.body.aa);

  return res.send('ㅎㅇㅎㅇ');
});
