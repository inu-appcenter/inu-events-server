import {z} from 'zod';



export type CommentResponse = {
  id: number;
  userId: number;
  nickname: string;
  profileImage?: string;
  eventId: number;
  content: string,
  createdAt: Date,
  wroteByMe?: boolean
};
