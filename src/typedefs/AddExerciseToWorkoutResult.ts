import { createUnionType, Field, ObjectType } from "type-graphql"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import { Unauthorized } from "./shared"

@ObjectType()
export class DuplicateWorkoutExercise {
  constructor({ workoutExercise }: { workoutExercise: WorkoutExercise }) {
    this.workoutExercise = workoutExercise
    this.message = "The workout already has this exercise"
  }

  @Field(() => WorkoutExercise)
  workoutExercise: WorkoutExercise

  @Field(() => String)
  message: string
}

@ObjectType()
export class InvalidSetAmount {
  constructor({ message }: { message: string }) {
    this.message = message
  }

  @Field(() => String)
  message: string
}

@ObjectType()
export class InvalidRepAmount {
  constructor({ message }: { message: string }) {
    this.message = message
  }

  @Field(() => String)
  message: string
}

const AddExerciseToWorkoutResult = createUnionType({
  name: "AddExerciseToWorkoutResult",
  types: () => [
    WorkoutExercise,
    Unauthorized,
    DuplicateWorkoutExercise,
    InvalidSetAmount,
    InvalidRepAmount,
  ],
})

export default AddExerciseToWorkoutResult
