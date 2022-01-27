import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useStore } from "../../store/store"
import { useEffect, useState } from "react"
import {
  useDeleteWorkoutMutation,
  WorkoutFragment,
} from "../../generated/graphql"
import error from "../../error/error"
import PageTitle from "../../components/PageTitle"
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline"
import DeleteWorkoutModal from "../../components/DeleteWorkoutModal"
import Button from "../../components/Button"
import { request } from "../../client"
import { toast } from "react-toastify"

const Workout: NextPage = observer(() => {
  const router = useRouter()
  const store = useStore()
  const [workout, setWorkout] = useState<null | WorkoutFragment>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [deleteWorkout] = useDeleteWorkoutMutation()

  useEffect(() => {
    const { id } = router.query
    if (!id) {
      error(router)
      return
    }

    const workout = store.getWorkoutById(id as string)

    if (!workout) {
      error(router)
      return
    }

    setWorkout(workout)
  }, [])

  const submit = async () => {
    if (!workout) return

    const data = await request(
      deleteWorkout({ variables: { id: workout.id } }),
      router
    )

    if (!data) return

    switch (data.deleteWorkout.__typename) {
      case "WorkoutDeleteSuccess":
        toast.success("Workout deleted")
        store.removeWorkout(workout)
        setIsOpen(false)
        router.replace("/workouts")
        break
      case "WorkoutDoesNotExist":
      case "NotLoggedIn":
      default:
        await error(router)
        setIsOpen(false)
        break
    }
  }

  if (!workout) return <div></div>

  return (
    <div className="flex flex-col items-center w-full ">
      <PageTitle backButton={true} title={workout.name} />
      <div className="p-6 w-full  space-y-6">
        <div
          onClick={() => router.push(`/workouts/update/${workout.id}`)}
          className="flex flex-row  justify-between bg-white w-full rounded-md shadow-sm border border-gray-300 px-6 py-3 font-semibold"
        >
          <label>Edit workout name</label>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
          type="orange"
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <TrashIcon className="w-6 h-6 text-white" />
            <label>Delete workout</label>
          </div>
        </Button>
      </div>
      <DeleteWorkoutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        submit={submit}
      />
    </div>
  )
})

export default Workout
