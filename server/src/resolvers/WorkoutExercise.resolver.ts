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
import { Workout } from "../entities/Workout.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import AddExerciseToWorkoutResult, {
  DuplicateWorkoutExercise,
} from "../typedefs/AddExerciseToWorkoutResult"
import ChangeExerciseInWorkoutResult from "../typedefs/ChangeExerciseInWorkoutResult"
import { ExerciseDoesNotExist } from "../typedefs/DeleteExerciseResult"
import { WorkoutDoesNotExist } from "../typedefs/DeleteWorkoutResults"
import RemoveExerciseFromWorkoutResult, {
  ExerciseNotInWorkout,
  RemoveExerciseFromWorkoutSuccess,
} from "../typedefs/RemoveExerciseFromWorkoutResult"
import { NotLoggedIn } from "../typedefs/shared"
import { Context } from "../types/Context"
import { validateRepsSets } from "./helpers/repSetValidation"

@Resolver(() => WorkoutExercise)
export class WorkoutExerciseResolver {
  @Mutation(() => AddExerciseToWorkoutResult)
  async addExerciseToWorkout(
    @Ctx() ctx: Context,
    @Arg("exerciseId", () => ID) exerciseId: string,
    @Arg("workoutId", () => ID) workoutId: string,
    @Arg("sets", () => Int) sets: number,
    @Arg("minReps", () => Int) minReps: number,
    @Arg("maxReps", () => Int) maxReps: number
  ): Promise<typeof AddExerciseToWorkoutResult> {
    const user = ctx.req.session.user

    if (!user) return new NotLoggedIn()

    const [exercise, workout] = await Promise.all([
      Exercise.findOne({ where: { id: exerciseId, user } }),
      Workout.findOne({ where: { id: workoutId, user } }),
    ])

    const duplicateWorkoutExercises = await WorkoutExercise.find({
      exercise,
      workout,
    })

    if (duplicateWorkoutExercises.length !== 0) {
      return new DuplicateWorkoutExercise({
        workoutExercise: duplicateWorkoutExercises[0]!,
      })
    }

    const repSetValidation = validateRepsSets({ sets, minReps, maxReps })

    if (repSetValidation) return repSetValidation

    const workoutExercise = await WorkoutExercise.create({
      exercise,
      workout,
      sets,
      minReps,
      maxReps,
    }).save()

    return workoutExercise
  }

  @Mutation(() => ChangeExerciseInWorkoutResult)
  async changeExerciseInWorkout(
    @Ctx() ctx: Context,
    @Arg("exerciseId", () => ID) exerciseId: string,
    @Arg("workoutId", () => ID) workoutId: string,
    @Arg("sets", () => Int, { nullable: true }) sets: number,
    @Arg("minReps", () => Int, { nullable: true }) minReps: number,
    @Arg("maxReps", () => Int, { nullable: true }) maxReps: number
  ): Promise<typeof ChangeExerciseInWorkoutResult> {
    const user = ctx.req.session.user

    if (!user) return new NotLoggedIn()

    const [exercise, workout] = await Promise.all([
      Exercise.findOne({ where: { id: exerciseId, user } }),
      Workout.findOne({ where: { id: workoutId, user } }),
    ])

    if (!exercise) return new ExerciseDoesNotExist({ id: exerciseId })
    if (!workout) return new WorkoutDoesNotExist({ id: workoutId })

    const workoutExercise = await WorkoutExercise.findOne({
      exercise,
      workout,
    })

    if (!workoutExercise) return new ExerciseNotInWorkout({ exercise, workout })

    const repSetValidation = validateRepsSets({ sets, minReps, maxReps })

    if (repSetValidation) return repSetValidation

    if (!!sets) workoutExercise.sets = sets
    if (!!minReps) workoutExercise.minReps = minReps
    if (!!maxReps) workoutExercise.maxReps = maxReps

    const res = workoutExercise.save()

    return res
  }

  @Mutation(() => RemoveExerciseFromWorkoutResult)
  async removeExerciseFromWorkout(
    @Ctx() ctx: Context,
    @Arg("exerciseId", () => ID) exerciseId: string,
    @Arg("workoutId", () => ID) workoutId: string
  ): Promise<typeof RemoveExerciseFromWorkoutResult> {
    const user = ctx.req.session.user

    if (!user) false

    try {
    } catch (e) {
      console.log(e)
    }

    const [exercise, workout] = await Promise.all([
      Exercise.findOne({ where: { id: exerciseId, user } }),
      Workout.findOne({ where: { id: workoutId, user } }),
    ])

    if (!exercise) return new ExerciseDoesNotExist({ id: exerciseId })
    if (!workout) return new WorkoutDoesNotExist({ id: workoutId })

    const workoutExercise = await WorkoutExercise.findOne({
      where: { exercise, workout },
    })

    if (!workoutExercise) return new ExerciseNotInWorkout({ exercise, workout })

    await WorkoutExercise.remove(workoutExercise)

    return new RemoveExerciseFromWorkoutSuccess({ id: workoutExercise.id })
  }

  @FieldResolver(() => Exercise)
  async exercise(@Root() workoutExercise: WorkoutExercise): Promise<Exercise> {
    const joinedWorkoutExercise = await WorkoutExercise.findOne({
      where: { id: workoutExercise.id },
      relations: ["exercise"],
    })

    return joinedWorkoutExercise!.exercise
  }
}
