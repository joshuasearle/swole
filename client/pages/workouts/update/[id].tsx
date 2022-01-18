import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useStore } from "../../../store/store"
import error from "../../../error/error"
import {
  WorkoutFragment,
  useEditWorkoutMutation,
} from "../../../generated/graphql"
import { request } from "../../../client"
import { toast } from "react-toastify"
import OneFieldPage from "../../../components/OneFieldPage"

const UpdateWorkout: NextPage = observer((props) => {
  const router = useRouter()
  const store = useStore()
  const [workout, setWorkout] = useState<null | WorkoutFragment>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [editWorkout] = useEditWorkoutMutation()

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

  const submit = async (name: string) => {
    if (!workout) return

    const data = await request(
      editWorkout({ variables: { id: workout.id, name } }),
      router
    )
    if (!data) return

    switch (data.changeWorkoutName.__typename) {
      case "Workout":
        store.updateWorkout(workout, { name })
        toast.success("Workout updated")
        router.replace(`/workouts/${workout.id}`)
        break
      case "NotLoggedIn":
      case "WorkoutDoesNotExist":
      default:
        // Should all not be possible
        await error(router)
        break
    }
  }

  if (!workout) return <div></div>

  return (
    <OneFieldPage
      label="Workout Name"
      buttonText="Update Workout"
      title="Update Workout"
      submit={submit}
      errorMessage={errorMessage}
      initial={workout.name}
    />
  )
})

export default UpdateWorkout
