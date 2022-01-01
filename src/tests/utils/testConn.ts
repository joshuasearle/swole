import { ConnectionOptions, createConnection } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const testTypeormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "swole_testing",
  synchronize: true,
  entities: [__dirname + "/../../**/*.entity.ts"],
}

export const testConn = (drop: boolean = false) => {
  return createConnection({ ...testTypeormConfig, dropSchema: drop })
}
