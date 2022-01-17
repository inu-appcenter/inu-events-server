// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript 참고

// noinspection ES6UnusedImports
import * as express from 'express-serve-static-core'; // 있어야 함.

declare module 'express-serve-static-core' {
  interface Request {
    /**
     * 요청에서 빼낸 사용자의 id를 가져옵니다.
     * 만약 없다면, 요구하는 그 순간에 예외를 던집니다.
     */
    get userId(): number;
  }
  interface Response {
    myField?: string;
  }
}
