import { createUnionType } from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { ExerciseDoesNotExist } from "./DeleteExerciseResult"
import { NotLoggedIn } from "./shared"

const ChangeExerciseNameResult = createUnionType({
  name: "ChangeExerciseNameResult",
  types: () => [Exercise, NotLoggedIn, ExerciseDoesNotExist],
})

export default ChangeExerciseNameResult
