import {ErrorRequestHandler} from 'express';
import {stringifyError} from '../../common/utils/error';
import HttpError from '../../common/errors/http/base/HttpError';
import {AssertionError} from 'assert';

export function errorHandler(): ErrorRequestHandler {
  return (err, req, res, _ /** 파라미터 4개 없으면 작동 안함! */) => {
    if (isHttpError(err)) {
      console.info(`HTTP 에러가 발생했습니다: ${stringifyError(err, false)}`);

      return res.status(err.statusCode).json(err.responseBody);
    } else if (isAssertionError(err)) {
      console.warn(`Assertion 에러가 발생했습니다: ${stringifyError(err)}`);

      const {message} = err;

      return res.status(500).json({
        statusCode: 500,
        error: 'assertion_failed',
        message,
      });
    } else if (isErrorWithStatusCode(err)) {
      console.error(`상태 코드와 함께 에러가 발생했습니다: ${stringifyError(err)}`);

      return res.status(500).json({
        statusCode: err.statusCode,
        error: err.name,
        message: err.message,
      });
    } else {
      console.error(`처리되지 않은 에러가 발생했습니다: ${stringifyError(err)}`);

      return res.status(500).json({
        statusCode: 500,
        error: 'unhandled',
        message: stringifyError(err),
      });
    }
  };
}

function isHttpError(error: Error): error is HttpError {
  return error instanceof HttpError;
}

function isAssertionError(error: Error): error is AssertionError {
  return error instanceof AssertionError;
}

function isErrorWithStatusCode(error: Error): error is Error & { statusCode: number } {
  // @ts-ignore
  return error['statusCode'] != null;
}
