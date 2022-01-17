import express from 'express';
import {getGoogleOAuthInfo} from '../../oauth';

const router = express.Router();

router.post('/login', async (req, res) => {
  const token = req.body.accessToken;

  if (token == null) {
    res.sendStatus(400);
    return;
  }

  const userInfo = getGoogleOAuthInfo(token);

  // TODO
});

export default router;
