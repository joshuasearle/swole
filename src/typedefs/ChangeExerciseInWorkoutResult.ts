import { createUnionType } from "type-graphql"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import {
  InvalidRepAmount,
  InvalidSetAmount,
} from "./AddExerciseToWorkoutResult"
import { ExerciseDoesNotExist } from "./DeleteExerciseResult"
import { WorkoutDoesNotExist } from "./DeleteWorkoutResults"
import { ExerciseNotInWorkout } from "./RemoveExerciseFromWorkoutResult"
import { Unauthorized } from "./shared"

const ChangeExerciseInWorkoutResult = createUnionType({
  name: "ChangeExerciseInWorkoutResult",
  types: () => [
    WorkoutExercise,
    Unauthorized,
    ExerciseDoesNotExist,
    WorkoutDoesNotExist,
    InvalidSetAmount,
    InvalidRepAmount,
    ExerciseNotInWorkout,
  ],
})

export default ChangeExerciseInWorkoutResult
