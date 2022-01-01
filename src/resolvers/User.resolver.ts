import { FieldResolver, Resolver, Root } from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { Set } from "../entities/Set.entity"
import { User } from "../entities/User.entity"
import { Workout } from "../entities/Workout.entity"

@Resolver(() => User)
export class UserResolver {
  @FieldResolver(() => [Exercise])
  async exercises(@Root() user: User): Promise<Exercise[]> {
    const exercises = await Exercise.find({ user })
    return exercises
  }

  @FieldResolver(() => [Workout])
  async workouts(@Root() user: User): Promise<Workout[]> {
    const workouts = await Workout.find({ user })
    return workouts
  }

  @FieldResolver(() => [Set])
  async sets(@Root() user: User): Promise<Set[]> {
    const sets = await Set.find({ user })
    return sets
  }
}
