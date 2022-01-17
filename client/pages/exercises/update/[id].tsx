import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useStore } from "../../../store/store"
import error from "../../../error/error"
import { ExerciseFragment } from "../../../generated/graphql"

const CreateExercise: NextPage = observer((props) => {
  const router = useRouter()
  const store = useStore()
  const [exercise, setExercise] = useState<null | ExerciseFragment>(null)

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

  if (!exercise) return <div></div>

  return <div>{JSON.stringify(exercise)}</div>
})

export default CreateExercise
