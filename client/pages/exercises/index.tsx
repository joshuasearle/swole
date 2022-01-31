import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useStore } from "../../store/store"
import ExerciseItem from "../../components/ExerciseItem"
import { UserDataFragment } from "../../generated/graphql"
import PageTitle from "../../components/PageTitle"
import { useRouter } from "next/router"
import AddButton from "../../components/AddButton"

interface ExercisesProps {
  userData?: UserDataFragment
}

const Exercises: NextPage<ExercisesProps> = observer((props) => {
  const store = useStore(props.userData)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <PageTitle title="Exercises" />

      <AddButton
        label="Add exercise"
        onClick={() => router.push("/exercises/create")}
      />

      <div className="flex flex-col space-y-6 w-full p-6 pt-4 h-full">
        {Object.keys(store.userDataMap!.exercises).map((exerciseId) => {
          const exercise = store.userDataMap!.exercises[exerciseId]
          return <ExerciseItem key={exerciseId} exercise={exercise} />
        })}
        <div className="h-[20vh]"></div>
      </div>
    </div>
  )
})

export default Exercises
