import { createUnionType, Field, ID, ObjectType } from "type-graphql"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class ExerciseDoesNotExist {
  constructor({ id }: { id: string }) {
    this.message = `There is no exercise with id ${id}`
  }

  @Field(() => String)
  message: string
}

@ObjectType()
export class ExerciseDeleteSuccess {
  constructor({ id }: { id: string }) {
    this.id = id
  }

  @Field(() => ID)
  id: string
}

const DeleteExerciseResult = createUnionType({
  name: "DeleteExerciseResult",
  types: () => [ExerciseDeleteSuccess, NotLoggedIn, ExerciseDoesNotExist],
})

export default DeleteExerciseResult
