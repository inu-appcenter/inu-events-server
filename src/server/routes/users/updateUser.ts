import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import UserRepository from "../../libs/application/user/user-repository";


const schema = defineSchema({
    params: {
        oauthId: z.string(),
    },
    query: {
        nickname: z.string(),
    }
});

export default defineRoute('patch', '/user/:oauthId?', schema, async (req, res) => {

    const {oauthId} = req.params;
    const {nickname} = req.query;

    await getCustomRepository(UserRepository).patchUser(oauthId, nickname);

    res.send();
});