import { User } from "../src/entities/User.entity"

declare module "express-session" {
  interface Session {
    user?: User
  }
}
