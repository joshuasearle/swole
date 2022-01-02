import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { Set } from "../entities/Set.entity"
import ChangeSetResult, { SetDoesNotExist } from "../typedefs/ChangeSetResult"
import CreateSetResult from "../typedefs/CreateSetResult"
import { ExerciseDoesNotExist } from "../typedefs/DeleteExerciseResult"
import DeleteSetResult, { SetDeleteSuccess } from "../typedefs/DeleteSetResult"
import { NotLoggedIn } from "../typedefs/shared"
import { Context } from "../types/Context"

@Resolver(() => Set)
export class SetResolver {
  @Mutation(() => CreateSetResult)
  async createSet(
    @Ctx() ctx: Context,
    @Arg("exerciseId", () => ID) exerciseId: string,
    @Arg("weight", () => Int) weight: number,
    @Arg("reps", () => Int) reps: number,
    @Arg("rpe", () => Int) rpe: number
  ): Promise<typeof CreateSetResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const exercise = await Exercise.findOne({ where: { id: exerciseId, user } })
    if (!exercise) return new ExerciseDoesNotExist({ id: exerciseId })

    const set = await Set.create({ user, exercise, reps, rpe, weight }).save()
    return set
  }

  @Mutation(() => ChangeSetResult)
  async changeSet(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string,
    @Arg("weight", () => Int, { nullable: true }) weight: number,
    @Arg("reps", () => Int, { nullable: true }) reps: number,
    @Arg("rpe", () => Int, { nullable: true }) rpe: number
  ): Promise<typeof ChangeSetResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const set = await Set.findOne({ where: { id, user } })
    if (!set) return new SetDoesNotExist({ id })

    if (!!weight) set.weight = weight
    if (!!reps) set.reps = reps
    if (!!reps) set.rpe = rpe

    const result = await set.save()

    return result
  }

  @Mutation(() => DeleteSetResult)
  async deleteSet(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string
  ): Promise<typeof DeleteSetResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const set = await Set.findOne({ where: { id, user } })
    if (!set) return new SetDoesNotExist({ id })

    await Set.remove(set)

    return new SetDeleteSuccess({ id })
  }

  @FieldResolver(() => Exercise)
  async exercise(@Root() set: Set): Promise<Exercise> {
    const joinedSet = await Set.findOne({
      where: { id: set.id },
      relations: ["exercise"],
    })

    return joinedSet!.exercise
  }
}
