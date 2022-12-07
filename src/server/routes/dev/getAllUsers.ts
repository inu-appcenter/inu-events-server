import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {UserResponseSchemeForDev} from "../../../entity/schemes";
import UserService from "../../../service/UserService";

const schema = defineSchema({
    tags: ['개발용'],
    summary: '[테스트] 전체 유저 목록 가져옴',
    description: '그냥 제가 보려고 만듦! ',

    response: [UserResponseSchemeForDev]
});

export default defineRoute('get', '/all-users', schema, async (req, res) => {
    const userInformation = await UserService.getAllUsers();

    return res.json(await Promise.all(userInformation.map(e => e.toDevResponse())));
});

