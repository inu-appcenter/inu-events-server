import {z, ZodOptional, ZodRawShape} from 'zod';
import {stringAsDate} from '../server/libs/zodTypes';

export function partialSchemeOf<T extends ZodRawShape>(shape: T): { [K in keyof T]: ZodOptional<T[K]> } {
  return Object.keys(shape).reduce((acc, key) => {
    return {...acc, [key]: shape[key].optional()}
  }, {} as { [K in keyof T]: ZodOptional<T[K]> });
}

export const EventRequestScheme = {
  title: z.string(),
  host: z.string().optional().nullable(),
  category: z.string(),
  target: z.string(),
  startAt: stringAsDate,
  endAt: stringAsDate.optional().nullable(),
  contact: z.string().optional().nullable(),
  location: z.string().optional().nullable(),

  body: z.string(),
  imageUuid: z.string().optional().nullable(),
};

export const EventResponseScheme = {
  id: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImage: z.string().optional().nullable(),

  title: z.string(),
  host: z.string().optional().nullable(),
  category: z.string(),
  target: z.string(),
  startAt: z.date(),
  endAt: z.date().optional().nullable(),
  contact: z.string().optional().nullable(),
  location: z.string().optional().nullable(),

  body: z.string(),
  imageUuid: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.date(),

  /**
   * 추가 속성.
   */
  wroteByMe: z.boolean().optional().nullable(),
  likedByMe: z.boolean().optional(),
  notificationSetByMe: z.boolean().optional().nullable(),
  notificationSetFor: z.string().optional().nullable(),

  comments: z.number(),
  views: z.number(),
  likes: z.number(),
  notifications: z.number(),
}

export const CommentRequestScheme = {
  eventId: z.number(),
  content: z.string(),
};

export const CommentResponseScheme = {
  id: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImage: z.string().optional().nullable(),
  eventId: z.number(),
  content: z.string(),
  createdAt: z.date(),
  wroteByMe: z.boolean().optional().nullable()
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
  imageUuid: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
}

export const UserResponseSchemeForDev = {
  id: z.number(),
  email: z.string(),
  oauthProvider: z.string(),
  nickname: z.string(),
  subscribingOn : z.string().optional().nullable(),
  createdAt:z.date()
}

export const SubscriptionScheme = {
  subscribing: z.boolean()
}

export const TopicsScheme = {
  topics: z.array(z.string())
}

export const UpdateMeRequestScheme = {
  nickname: z.string(),
  imageUuid: z.string().optional().nullable()
};

export const BlockUserRequestScheme = {
  targetUserId: z.number()
};

export const BlockResponseScheme = {
  user: z.object(UserResponseScheme),
  blockedAt: z.date(),
};

export const ReportResponseScheme = {
  userId: z.string(), // 일단 ID로 하자
  eventId: z.string(),
  msg: z.string().optional().nullable()
};
