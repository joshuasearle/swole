import connectRedis from "connect-redis"
import session from "express-session"
import dotenv from "dotenv"

import redis from "./redis"
import { User } from "./entities/User.entity"
import { Express, Request, Response, NextFunction } from "express"

dotenv.config()

const RedisStore = connectRedis(session)

const userMiddlware = async (req: Request, _: Response, next: NextFunction) => {
  const user = req.session.user
  if (!user) return next()

  req.session.user = await User.findOne({ id: user.id })
  next()
}

const sessionMiddleware = session({
  store: new RedisStore({
    client: redis,
  }),
  name: "sid",
  secret: process.env["SESSION_SECRET"]!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
  },
})

const applySessionMiddleware = (app: Express) => {
  app.use(sessionMiddleware)
  app.use(userMiddlware)
}

export default applySessionMiddleware
