import {serializeError} from 'serialize-error';

export function stringifyError(error: Error, includeStackTrace: boolean = true) {
  const {name, message, stack} = serializeError(error);

  const stringified = includeStackTrace ? {name, message, stack} : {name, message};

  return JSON.stringify(stringified);
}
