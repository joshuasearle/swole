import { createUnionType, Field, ObjectType } from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class DuplicateExerciseName {
  constructor({ name }: { name: string }) {
    this.name = name
  }

  @Field(() => String)
  name: string
}

const CreateExerciseResult = createUnionType({
  name: "CreateExerciseResult",
  types: () => [Exercise, NotLoggedIn, DuplicateExerciseName],
})

export default CreateExerciseResult
