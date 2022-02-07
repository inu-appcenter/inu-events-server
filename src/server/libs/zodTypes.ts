import {z} from 'zod';

/**
 * Express는 query와 params를 모두 string으로 줍니다.
 *
 * 따라서 만약 숫자로 된 인자를 받고 싶다면 ,
 * refine()을 통해 숫자 스트링만 걸러낸 뒤에 transform()으로 숫자로 변환해야 합니다.
 */

export const stringAsInt = z.string().refine(isInt).transform(toInt);
export const stringAsBoolean = z.string().refine(isBoolean).transform(toBoolean);
export const stringAsDate = z.string().refine(isISOString).transform(toDate);

import moment from 'moment';

export function isInt(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export function toInt(value: string): number {
  return parseInt(value, 10);
}

export function isBoolean(value: string): boolean {
  return ['true', 'false'].includes(value);
}

export function toBoolean(value: string): boolean {
  return value === 'true';
}

export function isISOString(value: string): boolean {
  return moment(value, moment.ISO_8601, true).isValid();
}

export function toDate(value: string): Date {
  return new Date(value);
}
