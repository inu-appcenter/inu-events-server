import express from 'express';
import {getGoogleOAuthInfo} from '../oauth';

const router = express.Router();

router.post('/login', async (req, res) => {
  const userInfo = getGoogleOAuthInfo(req.body.accessToken);

  // TODO
});

export default router;
