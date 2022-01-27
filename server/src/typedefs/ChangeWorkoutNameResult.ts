import { createUnionType } from "type-graphql"
import { Workout } from "../entities/Workout.entity"
import { DuplicateWorkoutName } from "./CreateWorkoutResult"
import { WorkoutDoesNotExist } from "./DeleteWorkoutResults"
import { NotLoggedIn } from "./shared"

const ChangeWorkoutNameResult = createUnionType({
  name: "ChangeWorkoutNameResult",
  types: () => [
    Workout,
    NotLoggedIn,
    WorkoutDoesNotExist,
    DuplicateWorkoutName,
  ],
})

export default ChangeWorkoutNameResult
