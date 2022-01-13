import { buildSchema } from "type-graphql"
import { ErrorInterceptor } from "./errors/errorHandler"

export const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    globalMiddlewares: [ErrorInterceptor],
    authChecker: ({ context: { req } }) => {
      const user = req.session.user
      return !!user
    },
  })
}
