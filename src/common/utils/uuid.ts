import uuid from 'uuid-with-v6';

/**
 * UUIDv6 생성합니다.
 * 타임스탬프 + 랜덤 구성입니다.
 */
export function generateUUID(): string {
  return uuid.v6();
}

export function generateUUIDHex(): string {
  const buffer = Buffer.alloc(16);

  uuid.v4({}, buffer);

  return buffer.toString('hex');
}
