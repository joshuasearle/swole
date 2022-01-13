import path from "path"
import { buildSchema } from "type-graphql"

const main = async () => {
  await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    emitSchemaFile: path.resolve(__dirname, "../../client/schema.graphql"),
  })

  console.log("schema.graphql file created")
}

main()
