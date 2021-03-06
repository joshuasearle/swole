import { Connection } from "typeorm"
import faker from "faker"

import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"
import { Exercise } from "../entities/Exercise.entity"
import { Set } from "../entities/Set.entity"
import { gCall } from "./utils/gCall"
import { v4 } from "uuid"
import { Workout } from "../entities/Workout.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
let conn: Connection
let user: User
let exercise: Exercise | undefined = undefined
let workout: Workout | undefined = undefined
let set: Set | undefined = undefined
let workoutExercise: WorkoutExercise | undefined = undefined

beforeAll(async () => {
  conn = await testConn()

  user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()

  exercise = await Exercise.create({
    name: faker.random.word(),
    user,
  }).save()

  workout = await Workout.create({
    name: faker.random.word(),
    user,
  }).save()

  workoutExercise = await WorkoutExercise.create({
    exercise,
    workout,
    setCount: 5,
    minReps: 4,
    maxReps: 6,
  }).save()
})

afterAll(async () => {
  await conn.close()
})

const createSetMutation = `
  mutation CreateSet($workoutExerciseId: ID!, $weight: Int!, $reps: Int!, $rpe: Int!) {
    createSet(workoutExerciseId: $workoutExerciseId, weight: $weight, reps: $reps, rpe: $rpe) {
      __typename
      ...on Set {
        id
      }
    }
  }
`

const changeSetMutation = `
  mutation ChangeSet($id: ID!, $weight: Int, $reps: Int, $rpe: Int) {
    changeSet(id: $id, weight: $weight, reps: $reps, rpe: $rpe) {
      __typename
    }
  }
`

const deleteSetMutation = `
  mutation DeleteSet($id: ID!) {
    deleteSet(id: $id) {
      __typename
      ... on SetDeleteSuccess {
        id
      }
    }
  }
`

describe("Set", () => {
  it("create set", async () => {
    const result = await gCall({
      source: createSetMutation,
      variableValues: {
        workoutExerciseId: workoutExercise?.id,
        weight: 100,
        reps: 5,
        rpe: 8,
      },
      user,
    })

    const data = result.data?.["createSet"]

    expect(data.__typename).toBe("Set")

    set = await Set.findOne({
      where: { id: data.id },
      relations: ["exercise", "user"],
    })

    expect(set).toBeDefined()
    expect(set?.weight).toBe(100)
    expect(set?.reps).toBe(5)
    expect(set?.rpe).toBe(8)
    expect(set?.exercise.id).toBe(exercise?.id)
    expect(set?.user.id).toBe(user?.id)
  })

  it("create set with invalid exercise", async () => {
    const result = await gCall({
      source: createSetMutation,
      variableValues: {
        workoutExerciseId: v4(),
        weight: 100,
        reps: 5,
        rpe: 8,
      },
      user,
    })

    const data = result.data?.["createSet"]

    expect(data.__typename).toBe("WorkoutExerciseDoesNotExist")
  })

  it("change set", async () => {
    const result = await gCall({
      source: changeSetMutation,
      variableValues: {
        id: set?.id,
        weight: 200,
      },
      user,
    })

    const data = result.data?.["changeSet"]

    expect(data.__typename).toBe("Set")

    set = await Set.findOne({ where: { id: set?.id } })

    expect(set?.weight).toBe(200)
  })

  it("change invalid set", async () => {
    const result = await gCall({
      source: changeSetMutation,
      variableValues: {
        id: v4(),
        weight: 200,
      },
      user,
    })

    const data = result.data?.["changeSet"]

    expect(data.__typename).toBe("SetDoesNotExist")
  })

  it("delete set", async () => {
    const result = await gCall({
      source: deleteSetMutation,
      variableValues: { id: set?.id },
      user,
    })

    const data = result.data?.["deleteSet"]

    expect(data.__typename).toBe("SetDeleteSuccess")

    set = await Set.findOne({ where: { id: set?.id } })

    expect(set).toBeUndefined()
  })

  it("delete invalid set", async () => {
    const result = await gCall({
      source: deleteSetMutation,
      variableValues: { id: v4() },
      user,
    })

    const data = result.data?.["deleteSet"]

    expect(data.__typename).toBe("SetDoesNotExist")
  })
})
