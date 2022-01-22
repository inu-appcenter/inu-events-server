import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import UserRepository from "../../libs/application/user/user-repository";


const schema = defineSchema({
    params: {
        oauthId: z.string(),
    },
});

export default defineRoute('delete', '/user/:oauthId?', schema, async (req, res) => {

    const {oauthId} = req.params;
    await getCustomRepository(UserRepository).deleteUser(oauthId);

    res.send();
});