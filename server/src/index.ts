import express from "express"
import dotenv from "dotenv"
import { createConnection } from "typeorm"
import applySessionMiddleware from "./session"
import getGraphqlHandler from "./graphql"
import cors from "cors"
import morgan from "morgan"

dotenv.config()

const app = express()

const port = process.env["PORT"] || 4000

const main = async () => {
  app.use(morgan("dev"))
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

  await createConnection()
  applySessionMiddleware(app)

  app.get("/", (_, res) => res.status(200).json())
  app.use("/graphql", await getGraphqlHandler())
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`)
  })
}

main()
