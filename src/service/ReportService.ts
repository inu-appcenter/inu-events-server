import User from '../entity/User';
import {Infer} from '../common/utils/zod';
import Event from '../entity/Event';
import Report from '../entity/Report';
import { ReportResponseScheme} from '../entity/schemes';
import UserService from './UserService';

class ReportService {
  async ReportEvent(userId: number,eventId: number): Promise<Report>{
    const user = await UserService.getUser(userId);
    const event = await Event.findOneOrFail(eventId);
    const report = await Report.create({...user,...event}).save();
    console.log(report);
    return report;
  }
  
}

export default new ReportService();

