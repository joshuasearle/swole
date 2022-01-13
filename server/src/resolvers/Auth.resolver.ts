import { compare, hash } from "bcrypt"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { User } from "../entities/User.entity"
import DeleteSelfResult, {
  DeleteSelfSuccess,
} from "../typedefs/DeleteSelfResult"
import LoginResult, {
  AlreadyLoggedIn,
  InvalidLoginCredentials,
} from "../typedefs/LoginResult"
import LogoutResult from "../typedefs/LogoutResult"
import RegisterResult, { EmailAlreadyExists } from "../typedefs/RegisterResult"
import { NotLoggedIn } from "../typedefs/shared"
import { Context } from "../types/Context"
import { destroySession } from "./helpers/destroySession"

@Resolver()
export class AuthResolver {
  @Mutation(() => RegisterResult)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<typeof RegisterResult> {
    const duplicateEmailUsers = await User.find({ email: email.toLowerCase() })
    if (duplicateEmailUsers.length !== 0) {
      return new EmailAlreadyExists({ email: email.toLowerCase() })
    }

    const hashedPassword = await hash(password, 12)

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    }).save()
    return user
  }

  @Mutation(() => LoginResult)
  async login(
    @Ctx() ctx: Context,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<typeof LoginResult> {
    if (ctx.req.session.user) return new AlreadyLoggedIn()

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return new InvalidLoginCredentials()

    const valid = await compare(password, user.password)
    if (!valid) return new InvalidLoginCredentials()

    ctx.req.session.user = user

    return user
  }

  @Mutation(() => LogoutResult)
  async logout(@Ctx() ctx: Context): Promise<typeof LogoutResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    await destroySession(ctx.req.session)

    return user
  }

  @Mutation(() => DeleteSelfResult)
  async deleteSelf(@Ctx() ctx: Context): Promise<typeof DeleteSelfResult> {
    const user = ctx.req.session.user
    if (!user) return new NotLoggedIn()

    await Promise.all([User.remove(user), destroySession(ctx.req.session)])

    return new DeleteSelfSuccess()
  }
}
