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
import { Workout } from "../entities/Workout.entity"
import CreateWorkoutResult, {
  DuplicateWorkoutName,
} from "../typedefs/CreateWorkoutResult"
import { NotLoggedIn } from "../typedefs/shared"
import DeleteWorkoutResult, {
  WorkoutDeleteSuccess,
  WorkoutDoesNotExist,
} from "../typedefs/DeleteWorkoutResults"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import ChangeWorkoutNameResult from "../typedefs/ChangeWorkoutNameResult"

@Resolver(() => Workout)
export class ExerciseResolver {
  @Mutation(() => CreateWorkoutResult)
  async createWorkout(
    @Ctx() ctx: Context,
    @Arg("name") name: string
  ): Promise<typeof CreateWorkoutResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const duplicateWorkouts = await Workout.find({ name, user })
    if (duplicateWorkouts.length !== 0) {
      return new DuplicateWorkoutName({ name })
    }

    return await Workout.create({ name, user, workoutExercises: [] }).save()
  }

  @Mutation(() => ChangeWorkoutNameResult)
  async changeWorkoutName(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string,
    @Arg("name") name: string
  ): Promise<typeof ChangeWorkoutNameResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const workout = await Workout.findOne({ where: { id: id, user } })

    if (!workout) return new WorkoutDoesNotExist({ id: id })
    workout.name = name

    const res = await workout.save()

    return res
  }

  @Mutation(() => DeleteWorkoutResult)
  async deleteWorkout(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string
  ): Promise<typeof DeleteWorkoutResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    const workout = await Workout.findOne({
      where: { id, user },
    })

    if (!workout) return new WorkoutDoesNotExist({ id })

    await Workout.remove(workout)

    return new WorkoutDeleteSuccess({ id })
  }

  @FieldResolver(() => [WorkoutExercise])
  async workoutExercises(@Root() workout: Workout): Promise<WorkoutExercise[]> {
    const workoutExercises = await WorkoutExercise.find({ workout })
    return workoutExercises
  }
}
