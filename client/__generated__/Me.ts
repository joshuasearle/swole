/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_NotLoggedIn {
  __typename: "NotLoggedIn";
}

export interface Me_me_User_exercises_sets {
  __typename: "Set";
  id: string;
}

export interface Me_me_User_exercises {
  __typename: "Exercise";
  id: string;
  name: string;
  sets: Me_me_User_exercises_sets[];
}

export interface Me_me_User_workouts_workoutExercises_exercise {
  __typename: "Exercise";
  id: string;
}

export interface Me_me_User_workouts_workoutExercises {
  __typename: "WorkoutExercise";
  id: string;
  sets: number;
  minReps: number;
  maxReps: number;
  exercise: Me_me_User_workouts_workoutExercises_exercise;
}

export interface Me_me_User_workouts {
  __typename: "Workout";
  id: string;
  name: string;
  workoutExercises: Me_me_User_workouts_workoutExercises[];
}

export interface Me_me_User_sets_exercise {
  __typename: "Exercise";
  id: string;
}

export interface Me_me_User_sets {
  __typename: "Set";
  id: string;
  created: any;
  weight: number;
  reps: number;
  rpe: number;
  exercise: Me_me_User_sets_exercise;
}

export interface Me_me_User {
  __typename: "User";
  id: string;
  email: string;
  exercises: Me_me_User_exercises[];
  workouts: Me_me_User_workouts[];
  sets: Me_me_User_sets[];
}

export type Me_me = Me_me_NotLoggedIn | Me_me_User;

export interface Me {
  me: Me_me;
}
