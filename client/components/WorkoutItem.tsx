import { ChevronRightIcon, DotsVerticalIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import React from "react"
import { WorkoutFragment } from "../generated/graphql"
import ListItem from "./ListItem"

interface WorkoutItemProps {
  workout: WorkoutFragment
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/workouts/${workout.id}`)}
      className="bg-white h-max w-full border border-gray-300 px-6 py-3 rounded-md shadow-sm flex flex-row justify-between items-center"
    >
      <label className="text-gray-900 font-semibold">{workout.name}</label>
      <ChevronRightIcon className="w-6 h-6" />
    </div>
  )
}

export default WorkoutItem
