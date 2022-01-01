import {
  InvalidRepAmount,
  InvalidSetAmount,
} from "../../typedefs/AddExerciseToWorkoutResult"

export const validateRepsSets = ({
  sets,
  minReps,
  maxReps,
}: {
  sets: number
  minReps: number
  maxReps: number
}) => {
  if (sets <= 0) {
    return new InvalidSetAmount({ message: "Can't have less than one set" })
  }

  if (minReps <= 0) {
    return new InvalidRepAmount({ message: "Can't have less than one rep" })
  }

  if (minReps > maxReps) {
    return new InvalidRepAmount({
      message: "Can't have minimum reps higher than maximum reps",
    })
  }

  return false
}
