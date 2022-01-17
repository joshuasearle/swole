import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useStore } from "../../../store/store"

const CreateExercise: NextPage = observer((props) => {
  const router = useRouter()
  const store = useStore()

  const { id } = router.query
  const exercise = useMemo(() => {
    return store.getExerciseById(id as string)
  }, [id])

  return <div>{JSON.stringify(exercise)}</div>
})

export default CreateExercise
