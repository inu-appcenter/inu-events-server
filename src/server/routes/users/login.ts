import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';

const schema = defineSchema({
  body: {
    accessToken: z.string(),
  }
});

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {accessToken} = req.body;

  const result = await LoginService.login(accessToken);

  return res.json(result);
});


