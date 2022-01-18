import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useStore } from "../../../store/store"
import error from "../../../error/error"
import {
  ExerciseFragment,
  useEditExerciseMutation,
} from "../../../generated/graphql"
import ExerciseEdit from "../../../components/NameEdit"
import PageTitle from "../../../components/PageTitle"
import { request } from "../../../client"
import { toast } from "react-toastify"
import OneFieldPage from "../../../components/OneFieldPage"

const UpdateExercise: NextPage = observer((props) => {
  const router = useRouter()
  const store = useStore()
  const [exercise, setExercise] = useState<null | ExerciseFragment>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [editExercise] = useEditExerciseMutation()

  useEffect(() => {
    const { id } = router.query
    if (!id) {
      error(router)
      return
    }

    const exercise = store.getExerciseById(id as string)

    if (!exercise) {
      error(router)
      return
    }

    setExercise(exercise)
  }, [])

  const submit = async (name: string) => {
    if (!exercise) return

    const data = await request(
      editExercise({ variables: { id: exercise.id, name } }),
      router
    )
    if (!data) return

    switch (data.changeExerciseName.__typename) {
      case "Exercise":
        store.updateExercise(exercise, { name })
        toast.success("Exercise updated")
        router.replace("/exercises")
        break
      case "NotLoggedIn":
      case "ExerciseDoesNotExist":
      default:
        // Should all not be possible
        await error(router)
        break
    }
  }

  if (!exercise) return <div></div>

  return (
    <OneFieldPage
      label="Exercise Name"
      buttonText="Update Exercise"
      title="Update Exercise"
      submit={submit}
      errorMessage={errorMessage}
    />
  )
})

export default UpdateExercise
