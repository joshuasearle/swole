import { createUnionType, Field, ObjectType } from "type-graphql"
import { User } from "../entities/User.entity"

@ObjectType()
export class EmailAlreadyExists {
  constructor({ email }: { email: string }) {
    this.email = email
  }

  @Field(() => String)
  email: string
}

const RegisterResult = createUnionType({
  name: "RegisterResult",
  types: () => [User, EmailAlreadyExists],
})

export default RegisterResult
