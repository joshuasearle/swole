import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NotLoggedIn {
  constructor() {
    this.message = "Not logged in"
  }

  @Field(() => String)
  message: string
}

@ObjectType()
export class Unauthorized {
  constructor() {
    this.message = "You do not have access to this resource"
  }

  @Field(() => String)
  message: string
}
