import { Ctx, Query, Resolver } from "type-graphql"
import { Context } from "../types/Context"
import MeResult from "../typedefs/MeResult"
import { NotLoggedIn } from "../typedefs/shared"

@Resolver()
export class MeResolver {
  @Query(() => MeResult)
  me(@Ctx() ctx: Context): typeof MeResult {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()
    return user
  }
}
