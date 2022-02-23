export function log(...data: any[]) {
  console.log(`${new Date().toLocaleString()}: `, ...data);
}
