import { createUnionType } from "type-graphql"
import { Workout } from "../entities/Workout.entity"
import { WorkoutDoesNotExist } from "./DeleteWorkoutResults"
import { NotLoggedIn } from "./shared"

const ChangeWorkoutNameResult = createUnionType({
  name: "ChangeWorkoutNameResult",
  types: () => [Workout, NotLoggedIn, WorkoutDoesNotExist],
})

export default ChangeWorkoutNameResult
