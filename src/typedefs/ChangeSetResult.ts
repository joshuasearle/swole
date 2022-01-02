import { createUnionType, Field, ObjectType } from "type-graphql"
import { NotLoggedIn } from "./shared"
import { Set } from "../entities/Set.entity"

@ObjectType()
export class SetDoesNotExist {
  constructor({ id }: { id: string }) {
    this.message = `There is no set with id ${id}`
  }

  @Field(() => String)
  message: string
}

const ChangeSetResult = createUnionType({
  name: "ChangeSetResult",
  types: () => [Set, NotLoggedIn, SetDoesNotExist],
})

export default ChangeSetResult
