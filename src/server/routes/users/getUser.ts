import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
});

export default defineRoute('get', '/user/:id', schema, async (req, res) => {
  const {id} = req.params;

  const userInformation = await UserService.getUser(id);

  return res.json(userInformation)
});

