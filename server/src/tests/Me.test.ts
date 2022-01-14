import { Connection } from "typeorm"
import faker from "faker"

import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"
import { Exercise } from "../entities/Exercise.entity"
import { Workout } from "../entities/Workout.entity"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import { gCall } from "./utils/gCall"
import { Set } from "../entities/Set.entity"

let conn: Connection
let user: User

const setsThroughExercisesQuery = `
  {
    me {
      ...on User {
        exercises {
          id
          name
          sets {
            id
            created
            weight
            reps
            rpe
          }
        }
      }
    }
  }
`

const exercisesThroughSetsQuery = `
  {
    me {
      ...on User {
        sets {
          id
          created
          weight
          reps
          rpe
          exercise {
            id
            name
          }
        }
      }
    }
  }
`

const exercisesThroughWorkouts = `
  {
    me {
      ...on User {
        workouts {
          id
          name
          workoutExercises {
            id
            setCount
            minReps
            maxReps
            exercise {
              id
              name
            }
          }
        }
      }
    }
  }
`

beforeAll(async () => {
  conn = await testConn()

  user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()

  const benchPress = await Exercise.create({ name: "Bench Press", user }).save()
  const squat = await Exercise.create({ name: "Squat", user }).save()
  const pullup = await Exercise.create({ name: "Pullup", user }).save()

  const upperBody = await Workout.create({ name: "Upper Body", user }).save()
  const lowerBody = await Workout.create({ name: "Lower Body", user }).save()
  const fullBody = await Workout.create({ name: "Full Body", user }).save()

  await WorkoutExercise.create({
    exercise: benchPress,
    workout: upperBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await WorkoutExercise.create({
    exercise: pullup,
    workout: upperBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await WorkoutExercise.create({
    exercise: benchPress,
    workout: fullBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await WorkoutExercise.create({
    exercise: pullup,
    workout: fullBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await WorkoutExercise.create({
    exercise: squat,
    workout: fullBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await WorkoutExercise.create({
    exercise: squat,
    workout: lowerBody,
    setCount: 5,
    minReps: 3,
    maxReps: 8,
  }).save()

  await Set.create({
    weight: 100,
    reps: 5,
    rpe: 8,
    exercise: benchPress,
    user,
  }).save()

  await Set.create({
    weight: 100,
    reps: 5,
    rpe: 8,
    exercise: benchPress,
    user,
  }).save()

  await Set.create({
    weight: 100,
    reps: 5,
    rpe: 8,
    exercise: benchPress,
    user,
  }).save()

  await Set.create({
    weight: 100,
    reps: 5,
    rpe: 8,
    exercise: squat,
    user,
  }).save()

  await Set.create({
    weight: 100,
    reps: 5,
    rpe: 8,
    exercise: squat,
    user,
  }).save()
})

afterAll(async () => {
  await conn.close()
})

describe("Me", () => {
  it("find sets through exercises", async () => {
    const result = await gCall({
      source: setsThroughExercisesQuery,
      user,
    })

    const data = result.data?.["me"]

    expect(data.exercises.length).toBe(3)

    data.exercises.forEach((exercise: any) => {
      if (exercise.name === "Bench Press") {
        expect(exercise.sets.length).toBe(3)
      } else if (exercise.name === "Squat") {
        expect(exercise.sets.length).toBe(2)
      } else if (exercise.name === "Pullup") {
        expect(exercise.sets.length).toBe(0)
      }
    })
  })

  it("find exercises through sets", async () => {
    const result = await gCall({
      source: exercisesThroughSetsQuery,
      user,
    })

    const data = result.data?.["me"]

    expect(data.sets.length).toBe(5)
    expect(
      data.sets.reduce(
        (count: number, set: any) =>
          count + +(set.exercise.name === "Bench Press"),
        0
      )
    ).toBe(3)
    expect(
      data.sets.reduce(
        (count: number, set: any) => count + +(set.exercise.name === "Squat"),
        0
      )
    ).toBe(2)
    expect(
      data.sets.reduce(
        (count: number, set: any) => count + +(set.exercise.name === "Pullup"),
        0
      )
    ).toBe(0)
  })

  it("find exercises through workouts", async () => {
    const result = await gCall({
      source: exercisesThroughWorkouts,
      user,
    })

    const data = result.data?.["me"]

    expect(data.workouts.length).toBe(3)

    data.workouts.forEach((workout: any) => {
      if (workout.name === "Upper Body") {
        expect(workout.workoutExercises.length).toBe(2)
      } else if (workout.name === "Lower Body") {
        expect(workout.workoutExercises.length).toBe(1)
      } else if (workout.name === "Full Body") {
        expect(workout.workoutExercises.length).toBe(3)
      }
    })
  })
})
