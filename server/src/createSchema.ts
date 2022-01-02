import { buildSchema } from "type-graphql"
import { ErrorInterceptor } from "./errors/errorHandler"

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    globalMiddlewares: [ErrorInterceptor],
    authChecker: ({ context: { req } }) => {
      const user = req.session.user
      return !!user
    },
  })
