export type UserReponse = {
  id: number;
  email: string;
  nickname: string;
}

export type EventResponse = {
  id: number;
  userId: number;
  nickname: string;
  profileImage?: string;

  title: string;
  host: string;
  category: string;
  target: string;
  startAt: Date;
  endAt?: Date;
  contact?: string;
  location?: string;

  body: string;
  imageUuid?: string;

  createdAt: Date;
  wroteByMe?: boolean;

  /**
   * 곧 사라질 운명들
   */
  submissionUrl?: string;
};

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
