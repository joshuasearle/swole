import { createSchema } from "./createSchema"
import { graphqlHTTP } from "express-graphql"

const getGraphqlHandler = async () => {
  const schema = await createSchema()

  return graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { req },
  }))
}

export default getGraphqlHandler
