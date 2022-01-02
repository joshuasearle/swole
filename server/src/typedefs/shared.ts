import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NotLoggedIn {
  constructor() {
    this.message = "Not logged in"
  }

  @Field(() => String)
  message: string
}
