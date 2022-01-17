import jwt from 'jsonwebtoken';
import config from '../../config';
import {SessionTokenContents} from '../types/types';

export function createJwt(payload: SessionTokenContents) {
  return jwt.sign(payload, config.server.jwt.key, {
    algorithm: 'HS256',
    expiresIn: config.server.jwt.expiresIn,
  });
}

export function decodeJwt(token: string): SessionTokenContents {
  return jwt.verify(token, config.server.jwt.key) as SessionTokenContents;
}
