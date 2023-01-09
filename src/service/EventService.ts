import Event from '../entity/Event';
import { log } from '../common/utils/log';
import { preview } from '../server/libs/json';
import User from '../entity/User';
import Comment from '../entity/Comment';
import EventLike from '../entity/EventLike';
import EventNotification from '../entity/EventNotification';
import UserService from './UserService';
import SubscriptionService from './SubscriptionService';
import { Infer } from '../common/utils/zod';
import { EventRequestScheme } from '../entity/schemes';
import {Brackets, In, Like, MoreThanOrEqual} from 'typeorm';


class EventService {
    private categoryList = [
        '', // 인덱스 0 자리채우기용,,,
        '동아리/소모임',
        '학생회',
        '간식나눔',
        '대회/공모전',
        '스터디',
        '구인',
        '기타',
        '교육/강연'
    ];


    /**
     * 1. 카테고리 값 보정
     * @param categoryId
     * @private
     */
    private specifyCategories(categoryId?: number): string[] {
        const id = categoryId ?? 0;

        return id > 0 // id가 0보다 크다?
            ? [this.categoryList[id]] // 무언가 지정한거임!
            : this.categoryList; // 아니면 전부 다 가능!
    }


    /**
     * 2. 이벤트 생성
     * @param userId
     * @param body
     */
    async makeEvent(userId: number, body: Infer<typeof EventRequestScheme>): Promise<Event> {
        const user = await UserService.getUser(userId);

        const event = await Event.create({ user, ...body }).save();

        log(`이벤트를 생성합니다: ${preview(body)}`);

        await SubscriptionService.broadcast(event);

        return event;
    }


    /**
     * 3. 모든 이벤트 가져오기! (이전 버전용)
     * @param eventId
     */
    async getEvent(eventId: number): Promise<Event> {
        const event = await Event.findOneOrFail(eventId);

        event.hit();
        await event.save();

        return event;
    }


    /**
     * 4. 모든 이벤트 가져오기 + 페이징 적용
     * @param userId
     * @param pageNum
     * @param pageSize
     */
    async getMyEvents(userId: number, pageNum?: number, pageSize?: number): Promise<Event[]> {
        const user = await User.findOneOrFail(userId);
        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }
        return await Event.find({
            where: { user },
            order: { id: 'DESC' },
            skip: pageSize * pageNum,
            take: pageSize,
        });
    }


    /**
     * 5. 전체 이벤트 가져오기 (로그인 여부에 따라 분기)
     * @param userId
     */
    async getEvents(userId?: number): Promise<Event[]> {
        if (userId == null) {
            return await this.getEventsRegardlessBlockings(); // 비회원은 전부
        } else {
            return await this.getEventsWithoutBlockedUser(userId); // 로그인 한 사람은 blocking user 빼고
        }
    }


    /**
     * 6. 전체 이벤트 가져오기 + 페이징 적용 (로그인 여부에 따라 분기)
     * @param userId
     * @param pageNum
     * @param pageSize
     */
    async getEventsbyPage(userId?: number, pageNum?: number, pageSize?: number): Promise<Event[]> {
        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }

        if (userId == null) { // 로그인 X.
            return await this.getEventsRegardlessBlockingsbyPage(pageNum, pageSize); // 비회원은 전부
        } else { // 로그인 한 사용자.
            return await this.getEventsWithoutBlockedUserbyPage(userId, pageNum, pageSize); // 로그인 한 사람은 blocking user 빼고
        }

    }


    /**
     * 7. 카테고리, 진행중 여부 필터링 + 페이징 적용 (로그인 여부에 따라 분기)
     * @param userId
     * @param categoryId
     * @param ongoingEventsOnly
     * @param pageNum
     * @param pageSize
     */
    async getCategorybyFiltering(userId?: number, categoryId?: number, ongoingEventsOnly?: boolean, pageNum?: number, pageSize?: number): Promise<Event[]> {
        if (ongoingEventsOnly == undefined) ongoingEventsOnly = false; // 비어있으면 전체 가져옴

        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }

        // 검색 대상 카테고리는 여러 개를 or 조건으로 담을 수 있게 합니다!
        const categories = this.specifyCategories(categoryId);

        if (userId == undefined) { // 로그인 X
            if (ongoingEventsOnly) {
                return await Event.find({
                    where: {
                        endAt: MoreThanOrEqual(new Date()),
                        category: In(categories)
                    },
                    order: { id: 'DESC' },
                    skip: pageSize * pageNum,
                    take: pageSize
                });
            } else {
                return await Event.find({
                    where: {
                        category: In(categories)
                    },
                    order: { id: 'DESC' },
                    skip: pageSize * pageNum,
                    take: pageSize
                });
            }
        } else { // 로그인 한 사용자
            return await this.getEventsWithoutBlockedUserbyFiltering(userId, categories, ongoingEventsOnly, pageNum, pageSize); // 로그인 한 사람은 blocking user 빼고
        }
    }

    /**
     *  8. 키워드 검색 + 카테고리 + 진행중 필터 + 페이징 적용 (로그인 여부 분기) NEW
     * @param userId
     * @param categoryId
     * @param ongoingEventsOnly
     * @param content
     * @param pageNum
     * @param pageSize
     */
    async getEventsbySearchWithFiltering(userId?: number,  categoryId?: number, ongoingEventsOnly?: boolean, content?: string, pageNum?: number, pageSize?: number): Promise<Event[]> {
        if (ongoingEventsOnly == undefined) ongoingEventsOnly = false; // 비어있으면 전체 가져옴
        if (categoryId == undefined) categoryId = 0; // 비어있으면 전체 가져옴

        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }

        if (content == null) content = ' ';

        // 검색 대상 카테고리는 여러 개를 or 조건으로 담을 수 있게 합니다!
        const categories = this.specifyCategories(categoryId);

        if (userId == null) { // 로그인 X.
            return await this.getEventsRegardlessBlockingsbySearchWithFiltering(categories,ongoingEventsOnly,content,pageNum, pageSize); // 비회원은 전부
        } else { // 로그인 한 사용자.
            return await this.getEventsWithoutBlockedUserbySearchWithFiltering(userId,categories,ongoingEventsOnly,content, pageNum, pageSize);
        }
    }


    /**
     * 9. 차단한 사용자가 작성한 글 제외하고 모든 이벤트 내려줌
     * @private
     */
    private async getEventsRegardlessBlockings(): Promise<Event[]> { // 기존
        return await Event.find({ order: { id: 'DESC' } });
    }


    /**
     * 10. 전체 이벤트 갯수 가져오기 (안씀)
     * @private
     */
    private async getTotalEvent(): Promise<number> {
        return await Event.count();
    }

    /**
     *  11. 진행 중인 행사 전체 갯수 가져오기 (안씀)
     */
    async getOngoingTotalEvent(): Promise<number> {
        return await Event.count({ where: { endAt: MoreThanOrEqual(new Date()) } });
    }

    /**
     * 12. (비회원용) 차단 생각하지 않고 모든 이벤트 페이징 적용해서 내려주기
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsRegardlessBlockingsbyPage(pageNum: number, pageSize: number): Promise<Event[]> {
        return await Event.find(
            {
                order: { id: 'DESC' },
                skip: pageSize * pageNum,
                take: pageSize,
            });
    }


    /**
     * 13. (비회원용) 차단 생각하지 않고 키워드 검색 + 진행중 + 카테고리 + 페이징
     * @param categories
     * @param ongoingEventsOnly
     * @param content
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsRegardlessBlockingsbySearchWithFiltering(categories:string[], ongoingEventsOnly: boolean,content:string,pageNum: number, pageSize: number): Promise<Event[]> {
        const keyword= content.replace(/\s+/gi, '|' )
        if (ongoingEventsOnly) { // 진행중인 이벤트만 가져옴
            return await Event.createQueryBuilder('event')
            /** relations 필드 가져오는 부분 */
            .leftJoinAndSelect('event.user', 'user')
            .leftJoinAndSelect('event.comments', 'comments')
            .leftJoinAndSelect('event.likes', 'likes')
            .leftJoinAndSelect('event.notifications', 'notifications')

            /** where 절을 위한 join(select는 안 함) */
            .leftJoin('event.user', 'event_composer')
            .where(`event.category IN (:categories)`, { categories })
            .andWhere(`event.end_at >= :date`, { date: new Date() })
            .andWhere(new Brackets((key) => {
                    key.where(`event.title REGEXP :keyword`,{keyword})
                        .orWhere(`event.body REGEXP :keyword`,{keyword})
                }))

            .take(pageSize)
            .skip(pageSize * pageNum) // 페이징 적용
            .orderBy('event.id', 'DESC')
            .getMany()
        } else {
            return await Event.createQueryBuilder('event')
            /** relations 필드 가져오는 부분 */
            .leftJoinAndSelect('event.user', 'user')
            .leftJoinAndSelect('event.comments', 'comments')
            .leftJoinAndSelect('event.likes', 'likes')
            .leftJoinAndSelect('event.notifications', 'notifications')

            /** where 절을 위한 join(select는 안 함) */
            .leftJoin('event.user', 'event_composer')         
            .where(`event.category IN (:categories)`, { categories })
            .andWhere(new Brackets((key) => {
                    key.where(`event.title REGEXP :keyword`,{keyword})
                        .orWhere(`event.body REGEXP :keyword`,{keyword})
                }))
            .take(pageSize)
            .skip(pageSize * pageNum) // 페이징 적용
            .orderBy('event.id', 'DESC')
            .getMany()
    }
    }

    /**
     * 14. (회원용) 차단한 사용자 이벤트 빼고 내려주기 (이전 버전용)
     * @param requestorId
     * @private
     */
    private async getEventsWithoutBlockedUser(requestorId: number): Promise<Event[]> {
        return await Event.createQueryBuilder('event')
            /** relations 필드 가져오는 부분 */
            .leftJoinAndSelect('event.user', 'user')
            .leftJoinAndSelect('event.comments', 'comments')
            .leftJoinAndSelect('event.likes', 'likes')
            .leftJoinAndSelect('event.notifications', 'notifications')

            /** where 절을 위한 join(select는 안 함) */
            .leftJoin('event.user', 'event_composer')
            .where(`event_composer.id NOT IN (
        SELECT blocked_user_id 
        FROM block
        WHERE block.blocking_user_id = :requestorId
        )`, { requestorId })
            .orderBy('event.id', 'DESC')
            .getMany()// group by 안해도 얘가 잘 처리해줌 ^~^
    }

    /**
     * 15. (회원용) 차단한 사용자 이벤트 빼고 모든 이벤트 내려주기 + 페이징 적용
     * @param requestorId
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsWithoutBlockedUserbyPage(requestorId: number, pageNum: number, pageSize: number): Promise<Event[]> {
        return await Event.createQueryBuilder('event')
            /** relations 필드 가져오는 부분 */
            .leftJoinAndSelect('event.user', 'user')
            .leftJoinAndSelect('event.comments', 'comments')
            .leftJoinAndSelect('event.likes', 'likes')
            .leftJoinAndSelect('event.notifications', 'notifications')

            /** where 절을 위한 join(select는 안 함) */
            .leftJoin('event.user', 'event_composer')
            .where(`event_composer.id NOT IN (
        SELECT blocked_user_id 
        FROM block
        WHERE block.blocking_user_id = :requestorId
        )`, { requestorId })
            .take(pageSize)
            .skip(pageSize * pageNum) // 페이징 적용
            .orderBy('event.id', 'DESC')
            .getMany(); // group by 안해도 얘가 잘 처리해줌 ^~^
    }

    /**
     * 16. (회원용) 차단한 사용자 제외한 이벤트 진행중 + 카테고리 필터링 + 페이징
     * @param requestorId
     * @param categories
     * @param ongoingEventsOnly
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsWithoutBlockedUserbyFiltering(requestorId: number, categories: string[], ongoingEventsOnly: boolean, pageNum: number, pageSize: number): Promise<Event[]> {
        if (ongoingEventsOnly) { // 진행중인 이벤트만 가져옴
            return await Event.createQueryBuilder('event')
                /** relations 필드 가져오는 부분 */
                .leftJoinAndSelect('event.user', 'user')
                .leftJoinAndSelect('event.comments', 'comments')
                .leftJoinAndSelect('event.likes', 'likes')
                .leftJoinAndSelect('event.notifications', 'notifications')

                /** where 절을 위한 join(select는 안 함) */
                .leftJoin('event.user', 'event_composer')
                .where(`event_composer.id NOT IN (
      SELECT blocked_user_id 
      FROM block
      WHERE block.blocking_user_id = :requestorId
      )`, { requestorId })
                .andWhere(`event.endAt >= :date`, { date: new Date() })
                .andWhere(`event.category IN (:categories)`, { categories })
                .take(pageSize)
                .skip(pageSize * pageNum) // 페이징 적용
                .orderBy('event.id', 'DESC')
                .getMany() // group by 안해도 얘가 잘 처리해줌 ^~^
        } else { // 모든 이벤트 가져옴
            return await Event.createQueryBuilder('event')
                /** relations 필드 가져오는 부분 */
                .leftJoinAndSelect('event.user', 'user')
                .leftJoinAndSelect('event.comments', 'comments')
                .leftJoinAndSelect('event.likes', 'likes')
                .leftJoinAndSelect('event.notifications', 'notifications')

                /** where 절을 위한 join(select는 안 함) */
                .leftJoin('event.user', 'event_composer')
                .where(`event_composer.id NOT IN (
      SELECT blocked_user_id 
      FROM block
      WHERE block.blocking_user_id = :requestorId
      )`, { requestorId })
                .andWhere(`event.category IN (:categories)`, { categories })
                .take(pageSize)
                .skip(pageSize * pageNum) // 페이징 적용
                .orderBy('event.id', 'DESC')
                .getMany() // group by 안해도 얘가 잘 처리해줌 ^~^
        }
    }



    /**
     * 17. (회원용) 차단한 사용자 제외하고 키워드 검색 + 진행중 + 카테고리 + 페이징 NEW
     * @param requestorId
     * @param categories
     * @param ongoingEventsOnly
     * @param content
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsWithoutBlockedUserbySearchWithFiltering(requestorId: number, categories:string[], ongoingEventsOnly: boolean,content: string, pageNum: number, pageSize: number): Promise<Event[]> {
        const keyword= content.replace(/\s+/gi, '|' )
        if (ongoingEventsOnly) { // 진행중인 이벤트만 가져옴
            return await Event.createQueryBuilder('event')
                /** relations 필드 가져오는 부분 */
                .leftJoinAndSelect('event.user', 'user')
                .leftJoinAndSelect('event.comments', 'comments')
                .leftJoinAndSelect('event.likes', 'likes')
                .leftJoinAndSelect('event.notifications', 'notifications')

                /** where 절을 위한 join(select는 안 함) */
                .leftJoin('event.user', 'event_composer')
                .where(`event.endAt >= :date`, { date: new Date() })
                .andWhere(`event.category IN (:categories)`, { categories })
                .andWhere(new Brackets((key) => {
                    key.where(`event.title REGEXP :keyword`,{keyword})
                        .orWhere(`event.body REGEXP :keyword`,{keyword})
                }))
                .andWhere(`event_composer.id NOT IN (
            SELECT blocked_user_id 
            FROM block
            WHERE block.blocking_user_id = :requestorId
            )`, { requestorId })
                .take(pageSize)
                .skip(pageSize * pageNum) // 페이징 적용
                .orderBy('event.id', 'DESC')
                .getMany() // group by 안해도 얘가 잘 처리해줌 ^~^
        } else { // 모든 이벤트 가져옴
            return await Event.createQueryBuilder('event')
                /** relations 필드 가져오는 부분 */
                .leftJoinAndSelect('event.user', 'user')
                .leftJoinAndSelect('event.comments', 'comments')
                .leftJoinAndSelect('event.likes', 'likes')
                .leftJoinAndSelect('event.notifications', 'notifications')
                /** where 절을 위한 join(select는 안 함) */
                .leftJoin('event.user', 'event_composer')
                .where(`event.category IN (:categories)`, { categories })
                .andWhere(new Brackets((key) => {
                    key.where(`event.title REGEXP :keyword`,{keyword})
                        .orWhere(`event.body REGEXP :keyword`,{keyword})
                }))
                .andWhere(`event_composer.id NOT IN (
            SELECT blocked_user_id 
            FROM block
            WHERE block.blocking_user_id = :requestorId
            )`, { requestorId })
                .take(pageSize)
                .skip(pageSize * pageNum) // 페이징 적용
                .orderBy('event.id', 'DESC')
                .getMany() // group by 안해도 얘가 잘 처리해줌 ^~^
        }
    }
    


    /**
     * 18. 진행 중인 행사 + 페이징 적용 (로그인 여부에 따라 분기)
     * @param userId
     * @param pageNum
     * @param pageSize
     */
    async getEventsOnGoing(userId?: number, pageNum?: number, pageSize?: number): Promise<Event[]> {
        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }
        return await this.getEventsOnGoingRegardlessBlockings(pageNum, pageSize);
    }

    /**
     * 19. (비회원용) 진행중인 행사 + 페이징 적용
     * @param pageNum
     * @param pageSize
     * @private
     */
    private async getEventsOnGoingRegardlessBlockings(pageNum: number, pageSize: number): Promise<Event[]> {
        const offset = pageSize * pageNum;
        return await Event.find(
            {
                where: { endAt: MoreThanOrEqual(new Date()) },
                order: { id: 'DESC' },
                skip: offset,
                take: pageSize,
            });
    }


    /**
     * 20. (회원용) 내가 댓글을 단 이벤트 모두 가져오기 + 페이징 적용
     * @param userId
     * @param pageNum
     * @param pageSize
     */
    async getEventsIveCommentedOn(userId: number, pageNum?: number, pageSize?: number): Promise<Event[]> {
        if (pageNum == undefined || pageSize == undefined) { // 하나라도 비어있으면
            pageNum = 0;
            pageSize = 0; // 전체 가져오는걸로!
        }

        return await Event.createQueryBuilder('event')

            /** relations 필드 가져오는 부분 */
            .leftJoinAndSelect('event.user', 'user')
            .leftJoinAndSelect('event.comments', 'comments')
            .leftJoinAndSelect('event.likes', 'likes')
            .leftJoinAndSelect('event.notifications', 'notifications')

            /** where 절을 위한 join(select는 안 함) */
            .leftJoin('event.comments', 'event_comments')
            .leftJoin('event_comments.user', 'comments_user')
            .where('comments_user.id = :userId', { userId })
            .take(pageSize)
            .skip(pageSize * pageNum) // 페이징 적용
            .getMany(); // group by 안해도 얘가 잘 처리해줌 ^~^
    }

    /**
     *  21. 이벤트 업데이트 (수정)
     * @param eventId
     * @param body
     */
    async patchEvent(eventId: number, body: Partial<Infer<typeof EventRequestScheme>>): Promise<string> {
        log(`이벤트 ${eventId}를 업데이트합니다: ${preview(body)}`);

        const patchevent = await Event.update(
            { id: eventId },
            body
        );

        return patchevent.raw;
    }

    /**
     * 22. 이벤트 삭제
     * @param eventId
     */
    async deleteEvent(eventId: number): Promise<void> {
        const event = await Event.findOneOrFail(eventId);

        log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 댓글을 모두 지웁니다.`);
        await Comment.delete({ event });

        log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 좋아요를 모두 지웁니다.`);
        await EventLike.delete({ event });

        log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 알림을 모두 지웁니다.`);
        await EventNotification.delete({ event });

        log(`이제 ${event}를 삭제합니다.`);
        await Event.delete({ id: eventId });
    }


}

export default new EventService();
