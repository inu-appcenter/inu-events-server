import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {z} from 'zod';
import fs from 'fs';
import * as path from 'path';
import config from '../../../config';

const schema = defineSchema({
  summary: '이미지 다운로드',
  description: '이미지를 내려받습니다.',

  params: {
    imageUuid: z.string()
  },
});

export default defineRoute('get', '/images/:imageUuid', schema, async (req, res) => {
  const {imageUuid} = req.params;

  const filePath = path.join(config.server.storage.image.path, imageUuid);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send();
  }

  const stream = fs.createReadStream(filePath);

  res.setHeader('Content-Type', 'image/png');

  stream.pipe(res);
});
