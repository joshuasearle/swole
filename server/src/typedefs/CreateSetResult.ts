import { createUnionType } from "type-graphql"
import { ExerciseDoesNotExist } from "./DeleteExerciseResult"
import { NotLoggedIn } from "./shared"
import { Set } from "../entities/Set.entity"

const CreateSetResult = createUnionType({
  name: "CreateSetResult",
  types: () => [Set, NotLoggedIn, ExerciseDoesNotExist],
})

export default CreateSetResult
