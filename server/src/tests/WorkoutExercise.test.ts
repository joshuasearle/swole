import { Connection } from "typeorm"
import faker from "faker"

import { testConn } from "./utils/testConn"
import { User } from "../entities/User.entity"
import { Workout } from "../entities/Workout.entity"
import { Exercise } from "../entities/Exercise.entity"
import { gCall } from "./utils/gCall"
import { WorkoutExercise } from "../entities/WorkoutExercise.entity"
import { v4 } from "uuid"

let conn: Connection
let user: User
let workout: Workout
let exercise: Exercise
let otherExercise: Exercise

beforeAll(async () => {
  conn = await testConn()

  user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }).save()

  workout = await Workout.create({
    name: faker.random.word(),
    user,
  }).save()

  exercise = await Exercise.create({
    name: faker.random.word(),
    user,
  }).save()

  otherExercise = await Exercise.create({
    name: faker.random.word(),
    user,
  }).save()
})

afterAll(async () => {
  await conn.close()
})

const addExerciseToWorkoutMutation = `
  mutation AddExerciseToWorkout($exerciseId: ID!, $workoutId: ID!, $maxReps: Int!, $minReps: Int!, $sets: Int!) {
    addExerciseToWorkout(exerciseId: $exerciseId, workoutId: $workoutId, maxReps: $maxReps, minReps: $minReps, sets: $sets) {
      __typename
    }
  }
`

const changeExerciseInWorkout = `
  mutation ChangeExerciseInWorkout($exerciseId: ID!, $workoutId: ID!, $maxReps: Int, $minReps: Int, $sets: Int) {
    changeExerciseInWorkout(exerciseId: $exerciseId, workoutId: $workoutId, maxReps: $maxReps, minReps: $minReps, sets: $sets) {
      __typename
    }
  }
`

const removeExerciseFromWorkout = `
  mutation RemoveExerciseFromWorkout($exerciseId: ID!, $workoutId: ID!) {
    removeExerciseFromWorkout(exerciseId: $exerciseId, workoutId: $workoutId) {
      __typename
    }
  }
`

describe("WorkoutExercise", () => {
  it("add exercise to workout with invalid set amount", async () => {
    const result = await gCall({
      source: addExerciseToWorkoutMutation,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: -1,
      },
      user,
    })

    const data = result.data?.["addExerciseToWorkout"]

    expect(data.__typename).toBe("InvalidSetAmount")
  })

  it("add exercise to workout with invalid rep amount", async () => {
    const result = await gCall({
      source: addExerciseToWorkoutMutation,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 8,
        minReps: 12, // min > max should cause different result
        sets: 5,
      },
      user,
    })

    const data = result.data?.["addExerciseToWorkout"]

    expect(data.__typename).toBe("InvalidRepAmount")
  })

  it("add exercise to workout", async () => {
    const result = await gCall({
      source: addExerciseToWorkoutMutation,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: 5,
      },
      user,
    })

    const data = result.data?.["addExerciseToWorkout"]

    expect(data.__typename).toBe("WorkoutExercise")

    const dbEntity = await WorkoutExercise.findOne({
      where: { exercise, workout },
    })

    expect(dbEntity).toBeDefined()
  })

  it("add duplicate exercise to workout", async () => {
    const result = await gCall({
      source: addExerciseToWorkoutMutation,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: 5,
      },
      user,
    })

    const data = result.data?.["addExerciseToWorkout"]

    expect(data.__typename).toBe("DuplicateWorkoutExercise")
  })

  it("change exercise in workout with undefined exercise", async () => {
    const result = await gCall({
      source: changeExerciseInWorkout,
      variableValues: {
        exerciseId: v4(),
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: 4, // different set amount
      },
      user,
    })

    const data = result.data?.["changeExerciseInWorkout"]

    expect(data.__typename).toBe("ExerciseDoesNotExist")
  })

  it("change exercise in workout with undefined workout", async () => {
    const result = await gCall({
      source: changeExerciseInWorkout,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: v4(),
        maxReps: 12,
        minReps: 8,
        sets: 4, // different set amount
      },
      user,
    })

    const data = result.data?.["changeExerciseInWorkout"]

    expect(data.__typename).toBe("WorkoutDoesNotExist")
  })

  it("change exercise in workout that is not in a workout", async () => {
    const result = await gCall({
      source: changeExerciseInWorkout,
      variableValues: {
        exerciseId: otherExercise.id,
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: 3, // different set amount
      },
      user,
    })

    const data = result.data?.["changeExerciseInWorkout"]

    expect(data.__typename).toBe("ExerciseNotInWorkout")
  })

  it("change exercise in workout", async () => {
    const result = await gCall({
      source: changeExerciseInWorkout,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 12,
        minReps: 8,
        sets: 4, // different set amount
      },
      user,
    })

    const data = result.data?.["changeExerciseInWorkout"]

    expect(data.__typename).toBe("WorkoutExercise")

    const dbEntity = await WorkoutExercise.findOne({
      where: { exercise, workout },
    })

    expect(dbEntity).toBeDefined()
    expect(dbEntity?.sets).toBe(4)
  })

  it("change exercise in workout with one prop", async () => {
    const result = await gCall({
      source: changeExerciseInWorkout,
      variableValues: {
        exerciseId: exercise.id,
        workoutId: workout.id,
        maxReps: 15, // different
      },
      user,
    })

    const data = result.data?.["changeExerciseInWorkout"]

    expect(data.__typename).toBe("WorkoutExercise")

    const dbEntity = await WorkoutExercise.findOne({
      where: { exercise, workout },
    })

    expect(dbEntity).toBeDefined()
    expect(dbEntity?.maxReps).toBe(15)
    expect(dbEntity?.sets).toBe(4)
    expect(dbEntity?.minReps).toBe(8)
  })

  it("remove invalid exercise from workout", async () => {
    const result = await gCall({
      source: removeExerciseFromWorkout,
      variableValues: { exerciseId: v4(), workoutId: workout.id },
      user,
    })

    const data = result.data?.["removeExerciseFromWorkout"]

    expect(data.__typename).toBe("ExerciseDoesNotExist")
  })

  it("remove exercise from invalid workout", async () => {
    const result = await gCall({
      source: removeExerciseFromWorkout,
      variableValues: { exerciseId: exercise.id, workoutId: v4() },
      user,
    })

    const data = result.data?.["removeExerciseFromWorkout"]

    expect(data.__typename).toBe("WorkoutDoesNotExist")
  })

  it("remove exercise from workout for which it is not a part of", async () => {
    const result = await gCall({
      source: removeExerciseFromWorkout,
      variableValues: { exerciseId: otherExercise.id, workoutId: workout.id },
      user,
    })

    const data = result.data?.["removeExerciseFromWorkout"]

    expect(data.__typename).toBe("ExerciseNotInWorkout")
  })

  it("remove exercise from workout", async () => {
    const result = await gCall({
      source: removeExerciseFromWorkout,
      variableValues: { exerciseId: exercise.id, workoutId: workout.id },
      user,
    })

    const data = result.data?.["removeExerciseFromWorkout"]

    expect(data.__typename).toBe("RemoveExerciseFromWorkoutSuccess")

    const dbEntity = await WorkoutExercise.findOne({
      where: { exercise, workout },
    })

    expect(dbEntity).toBeUndefined()
  })
})
