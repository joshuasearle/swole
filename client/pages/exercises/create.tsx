import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useState } from "react"
import { useCreateExerciseMutation } from "../../generated/graphql"
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

  const [addExercise] = useCreateExerciseMutation()

  const submit = async (name: string) => {
    const data = await request(addExercise({ variables: { name } }), router)
    if (!data) return

    switch (data.createExercise.__typename) {
      case "Exercise":
        store.addExercise(data.createExercise)
        toast.success("Exercise created")
        router.replace("/exercises")
        break
      case "DuplicateExerciseName":
        const message = "Duplicate exercise name"
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
      label="Exercise Name"
      buttonText="Create Exercise"
      title="Create Exercise"
      submit={submit}
      errorMessage={errorMessage}
    />
  )
})

export default CreateExercise
