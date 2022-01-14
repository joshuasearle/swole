import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { Set } from "../entities/Set.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import ChangeSetResult, { SetDoesNotExist } from "../typedefs/ChangeSetResult"
import CreateSetResult, {
  WorkoutExerciseDoesNotExist,
} from "../typedefs/CreateSetResult"
import DeleteSetResult, { SetDeleteSuccess } from "../typedefs/DeleteSetResult"
import { NotLoggedIn } from "../typedefs/shared"
import { Weight } from "../typedefs/WeightEnum"
import { Context } from "../types/Context"
import { gramsToKg, gramsToLb, kgToGrams, lbToKg } from "./helpers/weights"

@Resolver(() => Set)
export class SetResolver {
  @Mutation(() => CreateSetResult)
  async createSet(
    @Ctx() ctx: Context,
    @Arg("workoutExerciseId", () => ID) workoutExerciseId: string,
    @Arg("weight", () => Float) weight: number,
    @Arg("reps", () => Int) reps: number,
    @Arg("rpe", () => Int) rpe: number,
    @Arg("weightType", () => Weight) weightType: Weight
  ): Promise<typeof CreateSetResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const workoutExercise = await WorkoutExercise.findOne({
      where: { id: workoutExerciseId },
      relations: ["exercise", "workout"],
    })

    if (!workoutExercise) {
      return new WorkoutExerciseDoesNotExist({ id: workoutExerciseId })
    }

    if (weightType === Weight.LB) {
      weight = lbToKg(weight)
    }

    weight = kgToGrams(weight)

    const set = await Set.create({
      user,
      workoutExercise,
      exercise: workoutExercise.exercise,
      workout: workoutExercise.workout,
      reps,
      rpe,
      weight,
    }).save()
    return set
  }

  @Mutation(() => ChangeSetResult)
  async changeSet(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string,
    @Arg("weight", () => Float, { nullable: true }) weight: number,
    @Arg("reps", () => Int, { nullable: true }) reps: number,
    @Arg("rpe", () => Int, { nullable: true }) rpe: number,
    @Arg("weightType", () => Weight, { nullable: true }) weightType: Weight
  ): Promise<typeof ChangeSetResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const set = await Set.findOne({ where: { id, user } })
    if (!set) return new SetDoesNotExist({ id })

    if (!!weight) {
      if (weightType === Weight.LB) {
        weight = lbToKg(weight)
      }

      weight = kgToGrams(weight)
      set.weight = weight
    }
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

  @FieldResolver(() => WorkoutExercise)
  async workoutExercise(@Root() set: Set): Promise<WorkoutExercise> {
    const joinedSet = await Set.findOne({
      where: { id: set.id },
      relations: ["workoutExercise"],
    })

    return joinedSet!.workoutExercise
  }

  @FieldResolver(() => Float)
  async weight(
    @Root() set: Set,
    @Arg("weightType", () => Weight) weightType: Weight
  ): Promise<number> {
    if (weightType === Weight.LB) {
      return gramsToLb(set.weight)
    } else {
      return gramsToKg(set.weight)
    }
  }
}
