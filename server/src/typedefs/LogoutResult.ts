import { createUnionType } from "type-graphql"
import { User } from "../entities/User.entity"
import { NotLoggedIn } from "./shared"

const LogoutResult = createUnionType({
  name: "LogoutResult",
  types: () => [User, NotLoggedIn],
})

export default LogoutResult
