import { WorkoutExerciseFragment } from "../generated/graphql"
import { useStore } from "../store/store"

interface WorkoutExerciseItemProps {
  workoutExercise: WorkoutExerciseFragment
}

const WorkoutExerciseItem: React.FC<WorkoutExerciseItemProps> = ({
  workoutExercise,
}) => {
  const store = useStore()
  const exercise = store.userDataMap!.exercises[workoutExercise.exercise.id]

  return (
    <div className=" px-4 py-2 bg-white w-full border border-gray-300 rounded-md shadow-sm flex flex-col">
      <div className="text-gray-900 font-semibold">{exercise.name}</div>
      <div className="flex flex-row space-x-3">
        <span>{workoutExercise.setCount} sets</span>
        <span>|</span>
        <span>
          {workoutExercise.minReps} - {workoutExercise.maxReps} reps
        </span>
      </div>
    </div>
  )
}

export default WorkoutExerciseItem
