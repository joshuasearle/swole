import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useStore } from "../../store/store"
import ExerciseItem from "../../components/ExerciseItem"
import { UserDataFragment } from "../../generated/graphql"
import { toast, useToast } from "react-toastify"
import PageTitle from "../../components/PageTitle"
import { useRouter } from "next/router"

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
        className="p-[0.375rem] flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <label className="text-gray-700 font-semibold text-sm mt-2">
        Add exercise
      </label>

      <div className="flex  flew-col space-y-6 w-full pt-6 h-full">
        {store.userData?.exercises.map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  )
})

export default Exercises
