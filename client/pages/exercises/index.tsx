import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useStore } from "../../store/store"
import ExerciseItem from "../../components/ExerciseItem"
import { UserDataFragment } from "../../generated/graphql"
import PageTitle from "../../components/PageTitle"
import { useRouter } from "next/router"
import { PlusSmIcon } from "@heroicons/react/outline"
import { useMemo } from "react"

interface ExercisesProps {
  userData?: UserDataFragment
}

const Exercises: NextPage<ExercisesProps> = observer((props) => {
  const store = useStore(props.userData)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <PageTitle title="Exercises" />

      <div
        onClick={() => router.push("/exercises/create")}
        className="overflow-auto p-[0.375rem] flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm mt-4"
      >
        <PlusSmIcon className="h-8 w-8" />
      </div>

      <label className="text-gray-700 font-semibold text-sm mt-2">
        Add exercise
      </label>

      <div className="flex flex-col space-y-6 w-full p-6 pt-4 h-full">
        {store.userData?.exercises.map((exercise) => {
          if (!exercise) return null
          return <ExerciseItem key={exercise.id} exercise={exercise} />
        })}
        <div className="h-[20vh]"></div>
      </div>
    </div>
  )
})

export default Exercises
