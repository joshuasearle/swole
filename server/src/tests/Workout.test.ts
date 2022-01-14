import { Connection } from "typeorm"
import faker from "faker"

import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"
import { gCall } from "./utils/gCall"
import { Workout } from "../entities/Workout.entity"
import { v4 } from "uuid"
import { Exercise } from "../entities/Exercise.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"

let conn: Connection
let user: User
let name: string
let workout: Workout | undefined = undefined

beforeAll(async () => {
  conn = await testConn()

  user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()

  name = faker.random.word()
})

afterAll(async () => {
  await conn.close()
})

const createWorkoutMutation = `
  mutation CreateWorkout($name: String!) {
    createWorkout(name: $name) {
      __typename
      ...on Workout {
        id
      }
    }
  }
`

const changeWorkoutNameMutation = `
  mutation ChangeWorkoutName($id: ID!, $name: String!) {
    changeWorkoutName(id: $id, name: $name) {
      __typename
    }
  }
`

const deleteWorkoutMutation = `
  mutation DeleteWorkout($id: ID!) {
    deleteWorkout(id: $id) {
      __typename
    }
  }
`

describe("Exercise", () => {
  it("create exercise", async () => {
    const result = await gCall({
      source: createWorkoutMutation,
      variableValues: { name },
      user,
    })

    const data = result.data?.["createWorkout"]

    expect(data.__typename).toBe("Workout")

    workout = await Workout.findOne({ where: { id: data.id } })

    expect(workout).toBeDefined()
    expect(workout?.name).toBe(name)
  })

  it("create duplicate exercise", async () => {
    const result = await gCall({
      source: createWorkoutMutation,
      variableValues: { name },
      user,
    })

    const data = result.data?.["createWorkout"]

    expect(data.__typename).toBe("DuplicateWorkoutName")
  })

  it("change workout name", async () => {
    const newName = faker.random.word()
    const result = await gCall({
      source: changeWorkoutNameMutation,
      variableValues: { id: workout?.id, name: newName },
      user,
    })

    const data = result.data?.["changeWorkoutName"]

    expect(data.__typename).toBe("Workout")

    workout = await Workout.findOne({ where: { id: workout?.id } })

    expect(workout?.name).toBe(newName)
  })

  it("change workout name that does not exist", async () => {
    const newName = faker.random.word()
    const result = await gCall({
      source: changeWorkoutNameMutation,
      variableValues: { id: v4(), name: newName },
      user,
    })

    const data = result.data?.["changeWorkoutName"]

    expect(data.__typename).toBe("WorkoutDoesNotExist")
  })

  it("delete workout", async () => {
    const result = await gCall({
      source: deleteWorkoutMutation,
      variableValues: { id: workout?.id },
      user,
    })

    const data = result.data?.["deleteWorkout"]

    expect(data.__typename).toBe("WorkoutDeleteSuccess")

    workout = await Workout.findOne({ where: { id: workout?.id } })

    expect(workout).toBeUndefined()
  })

  it("delete workout that does not exist", async () => {
    const result = await gCall({
      source: deleteWorkoutMutation,
      variableValues: { id: v4() },
      user,
    })

    const data = result.data?.["deleteWorkout"]

    expect(data.__typename).toBe("WorkoutDoesNotExist")
  })

  it("delete workout with exercise", async () => {
    workout = await Workout.create({ user, name: faker.random.word() }).save()
    const exercise = await Exercise.create({
      user,
      name: faker.random.word(),
    }).save()

    let wrkEx: WorkoutExercise | undefined = await WorkoutExercise.create({
      exercise,
      workout,
      setCount: 5,
      minReps: 8,
      maxReps: 12,
    })

    await gCall({
      source: deleteWorkoutMutation,
      variableValues: { id: workout?.id },
      user,
    })

    wrkEx = await WorkoutExercise.findOne({ where: { id: wrkEx.id } })

    expect(wrkEx).toBeUndefined
  })
})
