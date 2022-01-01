import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Resolver,
  Root,
} from "type-graphql"
import { Context } from "../types/Context"
import { Exercise } from "../entities/Exercise.entity"
import CreateExerciseResult, {
  DuplicateExerciseName,
} from "../typedefs/CreateExerciseResult"
import { NotLoggedIn } from "../typedefs/shared"
import DeleteExerciseResult, {
  ExerciseDoesNotExist,
  ExerciseDeleteSuccess,
} from "../typedefs/DeleteExerciseResult"
import ChangeExerciseNameResult from "../typedefs/ChangeExerciseNameResult"
import { Set } from "../entities/Set.entity"

@Resolver(() => Exercise)
export class ExerciseResolver {
  @Mutation(() => CreateExerciseResult)
  async createExercise(
    @Ctx() ctx: Context,
    @Arg("name") name: string
  ): Promise<typeof CreateExerciseResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const duplicateExercises = await Exercise.find({ name, user })
    if (duplicateExercises.length !== 0) {
      return new DuplicateExerciseName({ name })
    }

    return await Exercise.create({ name, user, workoutExercises: [] }).save()
  }

  @Mutation(() => ChangeExerciseNameResult)
  async changeExerciseName(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string,
    @Arg("name") name: string
  ): Promise<typeof ChangeExerciseNameResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const exercise = await Exercise.findOne({ where: { id: id, user } })

    if (!exercise) return new ExerciseDoesNotExist({ id: id })
    exercise.name = name

    const res = await exercise.save()

    return res
  }

  @Mutation(() => DeleteExerciseResult)
  async deleteExercise(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string
  ): Promise<typeof DeleteExerciseResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const exercise = await Exercise.findOne({
      where: { id, user },
    })

    if (!exercise) return new ExerciseDoesNotExist({ id })

    await Exercise.remove(exercise)

    return new ExerciseDeleteSuccess({ id })
  }

  @FieldResolver(() => [Set])
  async sets(@Root() exercise: Exercise): Promise<Set[]> {
    const joinedExercise = await Exercise.findOne({
      where: { id: exercise.id },
      relations: ["sets"],
    })
    return joinedExercise!.sets
  }
}
