import { Session } from "express-session"

export const destroySession = async (session: Session) => {
  await new Promise<void>((resolve, reject) =>
    session.destroy((err) => {
      if (err) reject(err)
      else resolve()
    })
  )
}
