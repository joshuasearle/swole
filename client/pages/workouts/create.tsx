import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useState } from "react"
import { useCreateWorkoutMutation } from "../../generated/graphql"
import { request } from "../../client"
import { useRouter } from "next/router"
import error from "../../error/error"
import { toast } from "react-toastify"
import { useStore } from "../../store/store"
import OneFieldPage from "../../components/OneFieldPage"

const CreateExercise: NextPage = observer(() => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()
  const store = useStore()

  const [addWorkout] = useCreateWorkoutMutation()

  const submit = async (name: string) => {
    const data = await request(addWorkout({ variables: { name } }), router)
    if (!data) return

    switch (data.createWorkout.__typename) {
      case "Workout":
        store.addWorkout(data.createWorkout)
        toast.success("Workout Created")
        router.back()
        break
      case "DuplicateWorkoutName":
        const message = "Duplicate workout name"
        toast.error(message)
        setErrorMessage(message)
        break
      case "NotLoggedIn":
      // Shouldn't be possible, so redirect to error as well
      default:
        await error(router)
        break
    }
  }

  return (
    <OneFieldPage
      submit={submit}
      title="Create Workout"
      errorMessage={errorMessage}
      label="Workout Name"
      buttonText="Create Workout"
    />
  )
})

export default CreateExercise
