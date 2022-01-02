import { createUnionType, Field, ObjectType } from "type-graphql"
import { User } from "../entities/User.entity"

@ObjectType()
export class InvalidLoginCredentials {
  constructor() {
    this.message = "Invalid login credentials"
  }

  @Field(() => String)
  message: string
}

@ObjectType()
export class AlreadyLoggedIn {
  constructor() {
    this.message = "Already logged in"
  }

  @Field(() => String)
  message: string
}

const LoginResult = createUnionType({
  name: "LoginResult",
  types: () => [User, InvalidLoginCredentials, AlreadyLoggedIn],
})

export default LoginResult
