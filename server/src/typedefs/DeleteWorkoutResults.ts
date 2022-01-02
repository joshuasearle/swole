import { createUnionType, Field, ID, ObjectType } from "type-graphql"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class WorkoutDoesNotExist {
  constructor({ id }: { id: string }) {
    this.message = `There is no workout with id ${id}`
  }

  @Field(() => String)
  message: string
}

@ObjectType()
export class WorkoutDeleteSuccess {
  constructor({ id }: { id: string }) {
    this.id = id
  }

  @Field(() => ID)
  id: string
}

const DeleteWorkoutResult = createUnionType({
  name: "DeleteWorkoutResult",
  types: () => [WorkoutDeleteSuccess, NotLoggedIn, WorkoutDoesNotExist],
})

export default DeleteWorkoutResult
