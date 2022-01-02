import express from "express"
import dotenv from "dotenv"
import { createConnection } from "typeorm"
import applySessionMiddleware from "./session"
import getGraphqlHandler from "./graphql"

dotenv.config()

const app = express()

const port = process.env["PORT"] || 4000

const main = async () => {
  await createConnection()
  applySessionMiddleware(app)

  app.get("/", (_, res) => res.status(200).json())
  app.use("/graphql", await getGraphqlHandler())
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`)
  })
}

main()
