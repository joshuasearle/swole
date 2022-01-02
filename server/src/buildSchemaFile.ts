import path from "path"
import { buildSchema } from "type-graphql"

const main = async () => {
  await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    emitSchemaFile: path.resolve(__dirname, "../../client/schema.gql"),
  })

  console.log("schema.gql file created")
}

main()
