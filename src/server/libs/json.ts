import moment from 'moment';

export function preview(obj: any) {
  return JSON.stringify(obj, jsonReplacer);
}

/**
 * 주어진 object를 JSON 스트링으로 바꿀 때,
 * 직렬화 동작을 타입에 따라 오버라이드하는 replacer 입니다.
 * JSON.stringify의 두 번째 인자로 들어갑니다.
 *
 * undefined 타입의 필드를 명시적으로 null로 바꿔주며,
 * Date 타입의 필드를 +09:00 오프셋 표기하는 ISO 스트링으로 바꿔줍니다.
 */
export function jsonReplacer(this: any, key: any, value: any) {
  if (typeof value === "undefined") {
    return null;
  } else if (this[key] instanceof Date) {
    return moment(this[key]).toISOString(true);
  } else {
    return value;
  }
}
