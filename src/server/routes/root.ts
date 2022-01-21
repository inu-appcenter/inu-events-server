import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import p from '../../../package.json';

const schema = defineSchema({
});

export default defineRoute('get', '/', schema, async (req, res) => {
  return res.send(`ㅎㅇㅎㅇ v${p.version}`);
});
