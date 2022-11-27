import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import config from "../../../config";

const schema = defineSchema({
    tags: ['개발용'],
    summary: '[테스트] 서버의 애플관련 환경변수를 가져옵니다.',
    description: '개발용입니다! 테스트 끝났으니까 이제 안알려줌.',
});

export default defineRoute('get', '/apple-env', schema, async (req, res) => {
    return res.json("안알려줌");
    // return res.json(config.external.appleSignIn);
});

