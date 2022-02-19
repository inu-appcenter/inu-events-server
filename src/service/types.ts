export type UserReponse = {
  id: number;
  email: string;
  nickname: string;
}

export type EventResponse = {
  id: number;
  userId: number;
  nickname: string;
  host: string;
  category: string;
  title: string;
  body: string;
  imageUuid?: string;
  submissionUrl?: string;
  startAt?: Date;
  endAt?: Date;
  createdAt: Date;
  wroteByMe?: boolean
};

export type CommentResponse = {
  id: number;
  userId: number;
  nickname: string;
  eventId: number;
  content: string,
  createdAt: Date,
  wroteByMe?: boolean
};
