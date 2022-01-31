import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useStore } from "../../store/store"
import { UserDataFragment } from "../../generated/graphql"
import PageTitle from "../../components/PageTitle"
import { useRouter } from "next/router"
import WorkoutItem from "../../components/WorkoutItem"
import AddButton from "../../components/AddButton"

interface WorkoutsProps {
  userData?: UserDataFragment
}

const Workouts: NextPage<WorkoutsProps> = observer((props) => {
  const store = useStore(props.userData)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center">
      <PageTitle title="Workouts" />

      <AddButton
        label="Add workout"
        onClick={() => router.push("/workouts/create")}
      />

      <div className="flex flex-col space-y-6 w-full p-6 pt-4 h-full">
        {Object.keys(store.userDataMap!.workouts).map((workoutId) => {
          const workout = store.userDataMap!.workouts[workoutId]
          return <WorkoutItem key={workout.id} workout={workout} />
        })}
        <div className="h-[20vh]"></div>
      </div>
    </div>
  )
})

export default Workouts
