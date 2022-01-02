import { ConnectionOptions, createConnection } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const testTypeormConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env["DB_HOST"],
  port: +process.env["DB_PORT"]!,
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_TEST_NAME"],
  synchronize: true,
  entities: [__dirname + "/../../**/*.entity.ts"],
}

export const testConn = (drop: boolean = false) => {
  return createConnection({ ...testTypeormConfig, dropSchema: drop })
}
