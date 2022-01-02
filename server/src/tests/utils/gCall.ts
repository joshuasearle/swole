import { graphql, GraphQLSchema } from "graphql"
import { Maybe } from "graphql/jsutils/Maybe"
import { createSchema } from "../../createSchema"
import { User } from "../../entities/User.entity"

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any
  }>
  user?: User
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, user }: Options) => {
  if (!schema) schema = await createSchema()
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          user,
          destroy: (cb: any) => {
            cb()
          },
        },
      },
      res: {},
    },
  })
}
