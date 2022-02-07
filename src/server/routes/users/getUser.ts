import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
});

export default defineRoute('get', '/users/:id', schema, async (req, res) => {
  const {id} = req.params;

  const userInformation = await UserService.getUser(id);

  return res.json(userInformation)
});

