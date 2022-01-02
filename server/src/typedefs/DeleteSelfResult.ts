import { createUnionType, Field, ObjectType } from "type-graphql"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class DeleteSelfSuccess {
  constructor() {
    this.message = "User deleted"
  }

  @Field(() => String)
  message: string
}

const DeleteSelfResult = createUnionType({
  name: "DeleteSelfResult",
  types: () => [DeleteSelfSuccess, NotLoggedIn],
})

export default DeleteSelfResult
