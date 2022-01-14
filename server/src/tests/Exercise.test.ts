import { Connection } from "typeorm"
import faker from "faker"
import { v4 } from "uuid"

import { gCall } from "./utils/gCall"
import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"
import { Exercise } from "../entities/Exercise.entity"
import { Workout } from "../entities/Workout.entity"
import { Set } from "../entities/Set.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"

let conn: Connection
let user: User
let exercise: Exercise | undefined

beforeAll(async () => {
  conn = await testConn()

  user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()
})

afterAll(async () => {
  await conn.close()
})

const createExerciseMutation = `
  mutation CreateExercise($name: String!) {
    createExercise(name: $name) {
      __typename
      ...on Exercise {
        id
      }
    }
  }
`

const changeExerciseNameMutation = `
  mutation ChangeExerciseName($id: ID!, $name: String!) {
    changeExerciseName(id: $id, name: $name) {
      __typename
      ...on Exercise {
        id
      }
    }
  }
`

const deleteExerciseMutation = `
  mutation DeleteExercise($id: ID!) {
    deleteExercise(id: $id) {
      __typename
    }
  }
`

describe("Exercise", () => {
  const name = faker.random.word()
  const changedName = faker.random.word()

  it("create exercise", async () => {
    const result = await gCall({
      source: createExerciseMutation,
      variableValues: { name },
      user,
    })

    const data = result.data?.["createExercise"]

    expect(data.__typename).toBe("Exercise")

    exercise = await Exercise.findOne({ where: { id: data.id } })

    expect(exercise).toBeDefined()
    expect(exercise?.name).toBe(name)
  })

  it("create exercise with duplicate name", async () => {
    const result = await gCall({
      source: createExerciseMutation,
      variableValues: { name },
      user,
    })

    const data = result.data?.["createExercise"]

    expect(data.__typename).toBe("DuplicateExerciseName")
  })

  it("change exercise name", async () => {
    const result = await gCall({
      source: changeExerciseNameMutation,
      variableValues: {
        id: exercise?.id,
        name: changedName,
      },
      user,
    })

    const data = result.data?.["changeExerciseName"]

    expect(data.__typename).toBe("Exercise")
  })

  it("change invalid exercise name", async () => {
    const result = await gCall({
      source: changeExerciseNameMutation,
      variableValues: {
        id: v4(), // invalid id
        name: changedName,
      },
      user,
    })

    const data = result.data?.["changeExerciseName"]

    expect(data.__typename).toBe("ExerciseDoesNotExist")
  })

  it("delete exercise that does not exist", async () => {
    const result = await gCall({
      source: deleteExerciseMutation,
      variableValues: {
        id: v4(), // does not exist
      },
      user,
    })

    const data = result.data?.["deleteExercise"]

    expect(data.__typename).toBe("ExerciseDoesNotExist")
  })

  it("delete exercise", async () => {
    const result = await gCall({
      source: deleteExerciseMutation,
      variableValues: { id: exercise?.id },
      user,
    })

    const data = result.data?.["deleteExercise"]

    expect(data.__typename).toBe("ExerciseDeleteSuccess")

    exercise = await Exercise.findOne({ where: { id: exercise?.id } })

    expect(exercise).toBeUndefined()
  })

  it("delete exercise in a workout", async () => {
    const ex = await Exercise.create({ name: faker.random.word(), user }).save()
    const wrk = await Workout.create({ name: faker.random.word(), user }).save()

    let wrkEx: WorkoutExercise | undefined = await WorkoutExercise.create({
      exercise: ex,
      workout: wrk,
      setCount: 5,
      minReps: 8,
      maxReps: 12,
    }).save()

    await gCall({
      source: deleteExerciseMutation,
      variableValues: { id: ex?.id },
      user,
    })

    wrkEx = await WorkoutExercise.findOne({ where: { id: wrkEx.id } })

    expect(wrkEx).toBeUndefined()
  })

  it("delete exercise with set", async () => {
    let ex: Exercise | undefined = await Exercise.create({
      name: faker.random.word(),
      user,
    }).save()
    let set: Set | undefined = await Set.create({
      user,
      rpe: 8,
      reps: 5,
      weight: 100,
      exercise: ex,
    }).save()

    await gCall({
      source: deleteExerciseMutation,
      variableValues: { id: ex?.id },
      user,
    })

    set = await Set.findOne({ where: { id: set.id } })

    expect(set).toBeUndefined()
  })
})
