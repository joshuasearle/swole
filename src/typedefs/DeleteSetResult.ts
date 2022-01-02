import { createUnionType, Field, ID, ObjectType } from "type-graphql"
import { SetDoesNotExist } from "./ChangeSetResult"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class SetDeleteSuccess {
  constructor({ id }: { id: string }) {
    this.id = id
  }

  @Field(() => ID)
  id: string
}

const DeleteSetResult = createUnionType({
  name: "DeleteSetResult",
  types: () => [SetDeleteSuccess, NotLoggedIn, SetDoesNotExist],
})

export default DeleteSetResult
