import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import UserRepository from "../../libs/application/user/user-repository";


const schema = defineSchema({
    params: {
        userId: z.string(),
    },
});

export default defineRoute('get', '/user/:userId?', schema, async (req, res) => {

    const {userId} = req.params;
    const User_Information = await getCustomRepository(UserRepository).getUser(userId);
    //return res.send(`유저 ${userId}의 id : ${User_Information.id} , email : ${User_Information.email} , nickname : ${User_Information.nickname} , oauthProvider : ${User_Information.oauthProvider} , createAt : ${User_Information.createdAt}`);
    return res.json(User_Information)
});