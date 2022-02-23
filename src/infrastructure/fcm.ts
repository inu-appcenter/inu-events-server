import admin, {credential} from 'firebase-admin';

admin.initializeApp({
  credential: credential.applicationDefault(),
})

export async function sendFcm(registrationToken: string, title: string, body: string) {
  await admin.messaging().sendToDevice(registrationToken, {
    notification: {
      title,
      body,
    },
  });
}
