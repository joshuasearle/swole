import { graphqlHTTP } from "express-graphql"
import { createSchema } from "./createSchema"

const getGraphqlHandler = async () => {
  const schema = await createSchema()

  return graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { req },
  }))
}

export default getGraphqlHandler
