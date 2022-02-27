import User from '../entity/User';
import {log} from '../common/utils/log';
import {sendFcm} from '../infrastructure/fcm';
import UserService from './UserService';

class FcmService {
  async send(user: User, title: string, body: string) {
    if (user.fcmToken == null) {
      log(`${user}에게 알림을 쏘고 싶은데, fcmToken이 없어서 못보냄~`);
      return;
    }

    await this.sendInternal(user.fcmToken, title, body);
  }

  private async sendInternal(fcmToken: string, title: string, body: string) {
    log(`[${fcmToken}] 여기로 알림 빵야 가즈ㅏㅏ! 제목은 [${title}], 내용은 [${body}]`);

    await sendFcm(fcmToken, title, body);
  }

  async setFcmToken(userId: number, fcmToken: string) {
    const user = await UserService.getUser(userId)

    user.setFcmToken(fcmToken);

    await user.save();
  }
}

export default new FcmService();
