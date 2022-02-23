import User from '../entity/User';
import {log} from '../common/utils/log';

class FcmService {
  async send(user: User, title: string, body: string) {
    if (user.fcmToken == null) {
      log(`${user}에게 알림을 쏘고 싶은데, fcmToken이 없어서 못보냄~`);
      return;
    }

    await this.sendInternal(user.fcmToken, title, body);
  }

  private async sendInternal(fcmToken: string, title: string, body: string) {
    // TODO
    log(`[${fcmToken}] 여기로 알림 대충 쏜걸로 칩시다. ㅎㅎ `);
  }
}

export default new FcmService();
