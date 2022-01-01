import { FieldResolver, Resolver, Root } from "type-graphql"
import { Exercise } from "../entities/Exercise.entity"
import { Set } from "../entities/Set.entity"

@Resolver(() => Set)
export class SetResolver {
  @FieldResolver(() => Exercise)
  async exercise(@Root() set: Set): Promise<Exercise> {
    const joinedSet = await Set.findOne({
      where: { id: set.id },
      relations: ["exercise"],
    })

    return joinedSet!.exercise
  }
}
