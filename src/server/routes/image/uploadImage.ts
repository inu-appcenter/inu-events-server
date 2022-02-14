import {defineRoute} from '../../libs/route';
import {defineSchema} from '../../libs/schema';
import multer from 'multer';
import {generateUUID} from '../../../common/utils/uuid';
import e from 'express';
import config from '../../../config';
import {ThisWillNeverHappen} from '../../../common/errors/general';

const schema = defineSchema({});

const diskStorage = multer.diskStorage({
  destination: config.server.storage.image.path,
  filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, generateUUID());
  }
});

const multerFactory = multer({storage: diskStorage});

const fileProcessor = multerFactory.single('file');

export default defineRoute('post', '/images', schema, fileProcessor, async (req, res) => {
  const theFile = req.file;

  if (theFile == null) {
    throw ThisWillNeverHappen();
  }

  const {path, originalname, mimetype} = theFile;

  console.log(`"${path}" 경로에 ${mimetype} 타입의 이미지(원본 이름: "${originalname}") 생성됨.`);

  return res.json({
    uuid: theFile.filename
  });
});
