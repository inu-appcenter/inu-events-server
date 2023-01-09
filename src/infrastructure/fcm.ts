import admin, {credential} from 'firebase-admin';
import {log} from '../common/utils/log';
import {stringifyError} from '../common/utils/error';

admin.initializeApp({
  credential: credential.applicationDefault(),
})

export async function sendFcm(registrationToken: string, title: string, body: string, eventId?:string|undefined) {
  try {
    await admin.messaging().sendToDevice(registrationToken, {
      notification: {
        title,
        body,
        eventId,
      },
    });
  } catch (e) {
    log(`FCM 보내다가 조졌습니다: ${stringifyError(e)}`);
  }
}
