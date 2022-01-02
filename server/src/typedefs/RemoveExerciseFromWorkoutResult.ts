import { createUnionType, Field, ID, ObjectType } from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { Workout } from "../entities/Workout.entity"
import { ExerciseDoesNotExist } from "./DeleteExerciseResult"
import { WorkoutDoesNotExist } from "./DeleteWorkoutResults"
import { NotLoggedIn } from "./shared"

@ObjectType()
export class ExerciseNotInWorkout {
  constructor({ exercise, workout }: { exercise: Exercise; workout: Workout }) {
    this.exercise = exercise
    this.workout = workout
  }

  @Field(() => Exercise)
  exercise: Exercise

  @Field(() => Workout)
  workout: Workout
}

@ObjectType()
export class RemoveExerciseFromWorkoutSuccess {
  constructor({ id }: { id: string }) {
    this.id = id
  }

  @Field(() => ID)
  id: string
}

const RemoveExerciseFromWorkoutResult = createUnionType({
  name: "RemoveExerciseFromWorkoutResult",
  types: () => [
    RemoveExerciseFromWorkoutSuccess,
    NotLoggedIn,
    ExerciseDoesNotExist,
    WorkoutDoesNotExist,
    ExerciseNotInWorkout,
  ],
})

export default RemoveExerciseFromWorkoutResult
