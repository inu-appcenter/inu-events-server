export function redacted(data: Record<string, any>): Record<string, any> {
  if (typeof data !== 'object') {
    return data;
  }

  const copied = Object.assign({}, data);

  const secureFields = ['password'];
  for (const field of secureFields) {
    if (copied[field]) {
      copied[field] = '[삭제됨]';
    }
  }

  return copied;
}
