import React from "react"
import { ExerciseFragment } from "../generated/graphql"

interface ExerciseItemProps {
  exercise: ExerciseFragment
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  return (
    <div className="bg-white h-max w-full mx-6 border border-gray-300 px-6 py-3 rounded-md shadow-sm flex flex-row justify-between items-center">
      <label className="text-gray-900 font-semibold">{exercise.name}</label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </div>
  )
}

export default ExerciseItem
