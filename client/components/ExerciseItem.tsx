import React from "react"
import { ExerciseFragment } from "../generated/graphql"
import ExercisePopover from "./ExercisePopover"

interface ExerciseItemProps {
  exercise: ExerciseFragment
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  return (
    <div className="bg-white h-max w-full border border-gray-300 px-6 py-3 rounded-md shadow-sm flex flex-row justify-between items-center">
      <label className="text-gray-900 font-semibold">{exercise.name}</label>
      <ExercisePopover exercise={exercise} />
    </div>
  )
}

export default ExerciseItem
