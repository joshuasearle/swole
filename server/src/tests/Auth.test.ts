import { Connection } from "typeorm"
import faker from "faker"

import { gCall } from "./utils/gCall"
import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"

let conn: Connection
let otherUser: User

beforeAll(async () => {
  conn = await testConn()

  otherUser = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()
})

afterAll(async () => {
  await conn.close()
})

const registerMutation = `
  mutation Register($email:String!, $password:String!){
    register(email:$email, password:$password) {
      __typename
      ...on User {
        id
        email
      }
      ...on EmailAlreadyExists {
        email
      }
    }
  }
`

const loginMutation = `
  mutation Login($email:String!, $password:String!){
    login(email:$email, password:$password) {
      __typename
      ...on User {
        id
        email
      }
    }
  }
`

const deleteSelfMutation = `
  mutation DeleteSelf {
    deleteSelf {
      __typename
    }
  }  
`

const meQuery = `
  {
    me {
      __typename
      ...on User {
        id
      }
    }
  }
`

describe("Auth", () => {
  const email = faker.internet.email()
  const invalidEmail = faker.internet.email()
  const password = faker.internet.password()
  const invalidPassword = faker.internet.password()

  it("create user", async () => {
    const registerResult = await gCall({
      source: registerMutation,
      variableValues: {
        email,
        password,
      },
    })

    const data = registerResult.data?.["register"]

    expect(data.__typename).toBe("User")
    expect(data.email).toBe(email.toLowerCase())

    const dbUser = await User.findOne({ where: { email: data.email } })

    expect(dbUser).toBeDefined()
    expect(dbUser?.email).toBe(email.toLowerCase())
    expect(dbUser?.id).toBe(data.id)
  })

  it("create user with duplicate email", async () => {
    const registerResult = await gCall({
      source: registerMutation,
      variableValues: {
        email,
        password,
      },
    })

    const data = registerResult.data?.["register"]

    expect(data.__typename).toBe("EmailAlreadyExists")
    expect(data.email).toBe(email.toLowerCase())
  })

  it("login", async () => {
    const result = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password,
      },
    })

    const data = result.data?.["login"]

    expect(data.__typename).toBe("User")
    expect(data.email).toBe(email.toLowerCase())
  })

  it("login when already logged in", async () => {
    const result = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password,
      },
      user: otherUser,
    })

    const data = result.data?.["login"]

    expect(data.__typename).toBe("AlreadyLoggedIn")
  })

  it("login with email that does not exist", async () => {
    const result = await gCall({
      source: loginMutation,
      variableValues: {
        email: invalidEmail,
        password,
      },
    })

    const data = result.data?.["login"]
    expect(data.__typename).toBe("InvalidLoginCredentials")
  })

  it("login with wrong password", async () => {
    const result = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password: invalidPassword,
      },
    })

    const data = result.data?.["login"]
    expect(data.__typename).toBe("InvalidLoginCredentials")
  })

  it("me", async () => {
    const user = await User.findOne({ where: { email: email.toLowerCase() } })

    const result = await gCall({
      source: meQuery,
      user,
    })

    const data = result.data?.["me"]

    expect(data.__typename).toBe("User")
    expect(data.id).toBe(user?.id)
  })

  it("me not logged in", async () => {
    const result = await gCall({
      source: meQuery,
    })

    const data = result.data?.["me"]

    expect(data.__typename).toBe("NotLoggedIn")
  })

  it("delete self not logged in", async () => {
    const result = await gCall({
      source: deleteSelfMutation,
    })

    const data = result.data?.["deleteSelf"]
    expect(data.__typename).toBe("NotLoggedIn")
  })

  it("delete self", async () => {
    const user = await User.findOne({ where: { email: email.toLowerCase() } })

    const result = await gCall({
      source: deleteSelfMutation,
      user,
    })

    const data = result.data?.["deleteSelf"]
    expect(data.__typename).toBe("DeleteSelfSuccess")

    const noUser = await User.findOne({ where: { email } })
    expect(noUser).toBeUndefined()
  })
})
