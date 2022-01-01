import { createUnionType, Field, ObjectType } from "type-graphql"
import { Workout } from "../entities/Workout.entity"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class DuplicateWorkoutName {
  constructor({ name }: { name: string }) {
    this.name = name
  }

  @Field(() => String)
  name: string
}

const CreateWorkoutResult = createUnionType({
  name: "CreateWorkoutResult",
  types: () => [Workout, NotLoggedIn, DuplicateWorkoutName],
})

export default CreateWorkoutResult
