import moment from 'moment';

export function preview(obj: any) {
  return JSON.stringify(obj, jsonReplacer);
}

export function jsonReplacer(this: any, key: any, value: any) {
  if (typeof value === "undefined") {
    return null;
  } else if (this[key] instanceof Date) {
    return moment(this[key]).toISOString(true);
  } else {
    return value;
  }
}
