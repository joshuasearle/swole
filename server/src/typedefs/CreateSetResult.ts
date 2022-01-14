import { createUnionType, Field, ID, ObjectType } from "type-graphql"
import { NotLoggedIn } from "./shared"
import { Set } from "../entities/Set.entity"

@ObjectType()
export class WorkoutExerciseDoesNotExist {
  constructor({ id }: { id: string }) {
    this.id = id
  }

  @Field(() => ID)
  id: string
}

const CreateSetResult = createUnionType({
  name: "CreateSetResult",
  types: () => [Set, NotLoggedIn, WorkoutExerciseDoesNotExist],
})

export default CreateSetResult
