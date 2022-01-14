import {
  InvalidRepAmount,
  InvalidSetAmount,
} from "../../typedefs/AddExerciseToWorkoutResult"

export const validateRepsSets = ({
  setCount,
  minReps,
  maxReps,
}: {
  setCount: number
  minReps: number
  maxReps: number
}) => {
  if (setCount <= 0 && !!setCount) {
    return new InvalidSetAmount({ message: "Can't have less than one set" })
  }

  if (minReps <= 0 && !!minReps) {
    return new InvalidRepAmount({ message: "Can't have less than one rep" })
  }

  if (minReps > maxReps && !!minReps && !!maxReps) {
    return new InvalidRepAmount({
      message: "Can't have minimum reps higher than maximum reps",
    })
  }

  return false
}
