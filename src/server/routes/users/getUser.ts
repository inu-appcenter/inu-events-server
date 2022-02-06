import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import GetUser from '../../../service/user/getUser';


const schema = defineSchema({
    params: {
        oauthId: z.string(),
    },
});

export default defineRoute('get', '/user/:oauthId?', schema, async (req, res) => {

    const {oauthId} = req.params;
    const User_Information = await GetUser.getUser(oauthId);
    return res.json(User_Information)
});

