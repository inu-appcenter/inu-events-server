import {createConnection} from "typeorm";

export async function startTypeORM() {
  const connection = await createConnection();
  await connection.synchronize(true);
  console.log('db 연결 성공');
}
