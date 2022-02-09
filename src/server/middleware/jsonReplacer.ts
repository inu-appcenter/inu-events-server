export default function jsonReplacer(key: any, value: any) {
  // undefined values are set to `null`
  if (typeof value === "undefined") {
    return null;
  }
  return value;
}
