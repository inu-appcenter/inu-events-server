import {log} from '../common/utils/log';
import schedule from 'node-schedule';
import ScheduledPushService from './ScheduledPushService';

export async function startScheduler() {
  schedule.scheduleJob('* * * * *', async () => {
    await ScheduledPushService.tick(1);
  });

  log(`스케줄러 시작~~`);
}
