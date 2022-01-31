import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useStore } from "../../../../store/store"
import PageTitle from "../../../../components/PageTitle"
import Dropdown from "../../../../components/Dropdown"
import { Option } from "../../../../types/Option"
import Input from "../../../../components/Input"
import Button from "../../../../components/Button"
import { request } from "../../../../client"
import {
  useAddExerciseToWorkoutMutation,
  WorkoutFragment,
} from "../../../../generated/graphql"
import error from "../../../../error/error"

const CreateWorkoutExercise: NextPage = observer(() => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()
  const store = useStore()
  const exerciseOptions = store.getExerciseOptions()
  const [selectedExercise, setSelectedExercise] = useState<Option | undefined>(
    undefined
  )
  const [setCount, setSetCount] = useState<number | string>("")
  const [minReps, setMinReps] = useState<number | string>("")
  const [maxReps, setmaxReps] = useState<number | string>("")
  const [workout, setWorkout] = useState<null | WorkoutFragment>(null)

  const [addExerciseToWorkout] = useAddExerciseToWorkoutMutation()

  useEffect(() => {
    const { id } = router.query
    if (!id) {
      error(router)
      return
    }

    const workout = store.getWorkoutById(id as string)

    if (!workout) {
      error(router)
      return
    }

    setWorkout(workout)
  }, [])

  const valid =
    selectedExercise &&
    setCount &&
    !isNaN(+setCount) &&
    minReps &&
    !isNaN(+minReps) &&
    maxReps &&
    !isNaN(+maxReps) &&
    workout

  const submit = async () => {
    if (!valid) return
    const data = await request(
      addExerciseToWorkout({
        variables: {
          exerciseId: selectedExercise!.id,
          workoutId: workout!.id,
          setCount: +setCount,
          minReps: +minReps,
          maxReps: +maxReps,
        },
      }),
      router
    )

    if (!data) return

    let message: string

    switch (data.addExerciseToWorkout.__typename) {
      case "WorkoutExercise":
        store.addWorkoutExercise(workout!, data.addExerciseToWorkout)
        toast.success("Exercise Added to Workout")
        router.back()
        break
      case "InvalidSetAmount":
        message = "Invalid set amount"
        toast.error(message)
        setErrorMessage(message)
        break
      case "InvalidRepAmount":
        message = "Invalid rep amount"
        toast.error(message)
        setErrorMessage(message)
        break
      case "DuplicateWorkoutExercise":
        message = "This workout already has this exercise"
        toast.error(message)
        setErrorMessage(message)
        break
      case "NotLoggedIn":
      default:
        await error(router)
        break
    }
  }

  if (!exerciseOptions) {
    return null
  }

  return (
    <div className="flex flex-col items-center w-full">
      <PageTitle backButton={true} title="Add Exercise" />
      <div className="p-6 w-full h-full">
        <div className="bg-white rounded-md shadow-sm w-full border border-gray-300 p-6 space-y-6">
          <Dropdown
            label="Exercise"
            options={exerciseOptions}
            selectedOption={selectedExercise}
            setSelectedOption={setSelectedExercise}
            placeholder="Select an exercise"
          />
          <Input
            label="Sets"
            value={setCount}
            onChange={(e) => setSetCount(e.target.value)}
            type="number"
          />

          <Input
            label="Minimum Reps"
            value={minReps}
            onChange={(e) => setMinReps(e.target.value)}
            type="number"
          />

          <Input
            label="Maximum Reps"
            value={maxReps}
            onChange={(e) => setmaxReps(e.target.value)}
            type="number"
          />

          <Button type="teal" onClick={submit} disabled={!valid}>
            Add Exercise to Workout
          </Button>
        </div>
      </div>
    </div>
  )
})

export default CreateWorkoutExercise
