/**
 * 보통 요청에 대한 보통 에러를 일으킬 때에 사용합니다.
 * 에러로부터 바로 HTTP 응답을 만들어낼 수 있습니다.
 */
export default class HttpError extends Error {
  constructor(
    /**
     * 에러에 대응되는 HTTP 상태 코드
     */
    readonly statusCode: number,

    /**
     * 에러 식별자. 서비스 내부에서만 쓰이는 디테일을 표현. 예를 들어 invalid_remember_me_token 이라든가...
     */
    readonly error: string,

    /**
     * 에러에 대한 해설.
     */
    readonly message: string
  ) {
    super();
  }

  static with(statusCode: number): HttpErrorConstructorGenerator {
    return (error: string, message: string) => (messageOverride?: string) =>
      new HttpError(statusCode, error, messageOverride ?? message);
  }

  get responseBody() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
    };
  }
}

export type HttpErrorConstructorGenerator = (
  error: string,
  message: string
) => (messageOverride?: string) => HttpError;
