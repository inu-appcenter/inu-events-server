import {z} from 'zod';
import {extendApi} from '@anatine/zod-openapi';

export const EventResponseScheme = {
  id: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImage: z.string().optional(),

  title: z.string(),
  host: z.string(),
  category: z.string(),
  target: z.string(),
  startAt: z.date(),
  endAt: z.date().optional(),
  contact: z.string().optional(),
  location: z.string().optional(),

  body: z.string(),
  imageUuid: z.string().optional(),

  createdAt: z.date(),

  /**
   * 추가 속성.
   */
  wroteByMe: z.boolean().optional(),
  likedByMe: z.boolean().optional(),
  notificationSetByMe: z.boolean().optional(),
  notificationSetFor: z.string().optional(),

  views: z.number(),
  likes: z.number(),
  notifications: z.number(),

  /**
   * 곧 사라질 운명들
   */
  submissionUrl: extendApi(z.string().optional(), {description: '곧 사라져요~'})
}

export const CommentResponseScheme = {
  id: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImage: z.string().optional(),
  eventId: z.number(),
  content: z.string(),
  createdAt: z.date(),
  wroteByMe: z.boolean().optional()
};

export const EventNotificationScheme = {
  event: z.object(EventResponseScheme),
  setFor: z.string(),
}

export const EventNotificationRequestScheme = {
  eventId: z.number(),
  setFor: z.string(),
}

export const UserResponseScheme = {
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  imageUuid: z.string().optional(),
}

export const SubscriptionSchema = {
  subscribing: z.boolean()
}

export const TopicsScheme = {
  topics: z.array(z.string())
}
