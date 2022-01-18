import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useStore } from "../../store/store"
import { UserDataFragment } from "../../generated/graphql"
import PageTitle from "../../components/PageTitle"
import { useRouter } from "next/router"
import { PlusSmIcon } from "@heroicons/react/outline"
import WorkoutItem from "../../components/WorkoutItem"

interface WorkoutsProps {
  userData?: UserDataFragment
}

const Workouts: NextPage<WorkoutsProps> = observer((props) => {
  const store = useStore(props.userData)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <PageTitle title="Workouts" />

      <div
        onClick={() => router.push("/workouts/create")}
        className="overflow-auto p-[0.375rem] flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm mt-4"
      >
        <PlusSmIcon className="h-8 w-8" />
      </div>

      <label className="text-gray-700 font-semibold text-sm mt-2">
        Add workout
      </label>

      <div className="flex flex-col space-y-6 w-full p-6 pt-4 h-full">
        {store.userData?.workouts.map((workout) => {
          if (!workout) return null
          return <WorkoutItem key={workout.id} workout={workout} />
        })}
        <div className="h-[20vh]"></div>
      </div>
    </div>
  )
})

export default Workouts
