export type UserReponse = {
  id: number;
  email: string;
  nickname: string;
}

export type EventResponse = {
  id: number;
  userId: number;
  host: string;
  category: string;
  title: string;
  body: string;
  imageUuid: string;
  startAt?: Date;
  endAt?: Date;
  createdAt: Date;
  wroteByMe?: boolean
};

export type CommentResponse = {
  id: number;
  userId: number;
  eventId: number;
  content: string,
  createdAt: Date,
  wroteByMe?: boolean
};
