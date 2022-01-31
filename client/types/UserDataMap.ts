import {
  ExerciseFragment,
  WorkoutExerciseFragment,
  WorkoutFragment,
  SetFragment,
} from "../generated/graphql"

export interface UserDataMap {
  exercises: {
    [id: string]: ExerciseFragment
  }
  workouts: {
    [id: string]: WorkoutFragment
  }
  workoutExercises: {
    [id: string]: WorkoutExerciseFragment
  }
  sets: {
    [id: string]: SetFragment
  }
}
