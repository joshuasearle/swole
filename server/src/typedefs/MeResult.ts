import { createUnionType } from "type-graphql"
import { User } from "../entities/User.entity"
import { NotLoggedIn } from "./shared"

const MeResult = createUnionType({
  name: "MeResult",
  types: () => [User, NotLoggedIn],
})

export default MeResult
