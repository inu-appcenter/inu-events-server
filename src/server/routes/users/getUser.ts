import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';

const schema = defineSchema({
  params: {
    id: z.string(),
  },
});

export default defineRoute('get', '/user/:id', schema, async (req, res) => {
  const {id} = req.params;

  const userInformation = await UserService.getUser(id);

  return res.json(userInformation)
});

