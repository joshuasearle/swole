import dotenv from "dotenv"
import { ConnectionOptions } from "typeorm"

dotenv.config()

const typeormConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env["DB_HOST"],
  port: +process.env["DB_PORT"]!,
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  synchronize: true,
  entities: ["src/**/*.entity.ts"],
  logging: false,
}

export default typeormConfig
