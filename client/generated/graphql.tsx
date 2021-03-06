import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddExerciseToWorkoutResult = DuplicateWorkoutExercise | InvalidRepAmount | InvalidSetAmount | NotLoggedIn | WorkoutExercise;

export type AlreadyLoggedIn = {
  __typename?: 'AlreadyLoggedIn';
  message: Scalars['String'];
};

export type ChangeExerciseInWorkoutResult = ExerciseDoesNotExist | ExerciseNotInWorkout | InvalidRepAmount | InvalidSetAmount | NotLoggedIn | WorkoutDoesNotExist | WorkoutExercise;

export type ChangeExerciseNameResult = DuplicateExerciseName | Exercise | ExerciseDoesNotExist | NotLoggedIn;

export type ChangeSetResult = NotLoggedIn | Set | SetDoesNotExist;

export type ChangeWorkoutNameResult = DuplicateWorkoutName | NotLoggedIn | Workout | WorkoutDoesNotExist;

export type CreateExerciseResult = DuplicateExerciseName | Exercise | NotLoggedIn;

export type CreateSetResult = NotLoggedIn | Set | WorkoutExerciseDoesNotExist;

export type CreateWorkoutResult = DuplicateWorkoutName | NotLoggedIn | Workout;

export type DeleteExerciseResult = ExerciseDeleteSuccess | ExerciseDoesNotExist | NotLoggedIn;

export type DeleteSelfResult = DeleteSelfSuccess | NotLoggedIn;

export type DeleteSelfSuccess = {
  __typename?: 'DeleteSelfSuccess';
  message: Scalars['String'];
};

export type DeleteSetResult = NotLoggedIn | SetDeleteSuccess | SetDoesNotExist;

export type DeleteWorkoutResult = NotLoggedIn | WorkoutDeleteSuccess | WorkoutDoesNotExist;

export type DuplicateExerciseName = {
  __typename?: 'DuplicateExerciseName';
  name: Scalars['String'];
};

export type DuplicateWorkoutExercise = {
  __typename?: 'DuplicateWorkoutExercise';
  message: Scalars['String'];
  workoutExercise: WorkoutExercise;
};

export type DuplicateWorkoutName = {
  __typename?: 'DuplicateWorkoutName';
  name: Scalars['String'];
};

export type EmailAlreadyExists = {
  __typename?: 'EmailAlreadyExists';
  email: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['ID'];
  name: Scalars['String'];
  sets: Array<Set>;
};

export type ExerciseDeleteSuccess = {
  __typename?: 'ExerciseDeleteSuccess';
  id: Scalars['ID'];
};

export type ExerciseDoesNotExist = {
  __typename?: 'ExerciseDoesNotExist';
  message: Scalars['String'];
};

export type ExerciseNotInWorkout = {
  __typename?: 'ExerciseNotInWorkout';
  exercise: Exercise;
  workout: Workout;
};

export type InvalidLoginCredentials = {
  __typename?: 'InvalidLoginCredentials';
  message: Scalars['String'];
};

export type InvalidRepAmount = {
  __typename?: 'InvalidRepAmount';
  message: Scalars['String'];
};

export type InvalidSetAmount = {
  __typename?: 'InvalidSetAmount';
  message: Scalars['String'];
};

export type LoginResult = AlreadyLoggedIn | InvalidLoginCredentials | User;

export type LogoutResult = NotLoggedIn | User;

export type MeResult = NotLoggedIn | User;

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseToWorkout: AddExerciseToWorkoutResult;
  changeExerciseInWorkout: ChangeExerciseInWorkoutResult;
  changeExerciseName: ChangeExerciseNameResult;
  changeSet: ChangeSetResult;
  changeWorkoutName: ChangeWorkoutNameResult;
  createExercise: CreateExerciseResult;
  createSet: CreateSetResult;
  createWorkout: CreateWorkoutResult;
  deleteExercise: DeleteExerciseResult;
  deleteSelf: DeleteSelfResult;
  deleteSet: DeleteSetResult;
  deleteWorkout: DeleteWorkoutResult;
  login: LoginResult;
  logout: LogoutResult;
  register: RegisterResult;
  removeExerciseFromWorkout: RemoveExerciseFromWorkoutResult;
};


export type MutationAddExerciseToWorkoutArgs = {
  exerciseId: Scalars['ID'];
  maxReps: Scalars['Int'];
  minReps: Scalars['Int'];
  setCount: Scalars['Int'];
  workoutId: Scalars['ID'];
};


export type MutationChangeExerciseInWorkoutArgs = {
  exerciseId: Scalars['ID'];
  maxReps?: InputMaybe<Scalars['Int']>;
  minReps?: InputMaybe<Scalars['Int']>;
  setCount?: InputMaybe<Scalars['Int']>;
  workoutId: Scalars['ID'];
};


export type MutationChangeExerciseNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationChangeSetArgs = {
  id: Scalars['ID'];
  reps?: InputMaybe<Scalars['Int']>;
  rpe?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Int']>;
};


export type MutationChangeWorkoutNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationCreateExerciseArgs = {
  name: Scalars['String'];
};


export type MutationCreateSetArgs = {
  reps: Scalars['Int'];
  rpe: Scalars['Int'];
  weight: Scalars['Int'];
  workoutExerciseId: Scalars['ID'];
};


export type MutationCreateWorkoutArgs = {
  name: Scalars['String'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSetArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveExerciseFromWorkoutArgs = {
  exerciseId: Scalars['ID'];
  workoutId: Scalars['ID'];
};

export type NotLoggedIn = {
  __typename?: 'NotLoggedIn';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: MeResult;
};

export type RegisterResult = EmailAlreadyExists | User;

export type RemoveExerciseFromWorkoutResult = ExerciseDoesNotExist | ExerciseNotInWorkout | NotLoggedIn | RemoveExerciseFromWorkoutSuccess | WorkoutDoesNotExist;

export type RemoveExerciseFromWorkoutSuccess = {
  __typename?: 'RemoveExerciseFromWorkoutSuccess';
  id: Scalars['ID'];
};

export type Set = {
  __typename?: 'Set';
  created: Scalars['DateTime'];
  exercise: Exercise;
  id: Scalars['ID'];
  reps: Scalars['Int'];
  rpe: Scalars['Int'];
  weight: Scalars['Int'];
  workout: Workout;
  workoutExercise: WorkoutExercise;
};

export type SetDeleteSuccess = {
  __typename?: 'SetDeleteSuccess';
  id: Scalars['ID'];
};

export type SetDoesNotExist = {
  __typename?: 'SetDoesNotExist';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  sets: Array<Set>;
  workouts: Array<Workout>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  name: Scalars['String'];
  workoutExercises: Array<WorkoutExercise>;
};

export type WorkoutDeleteSuccess = {
  __typename?: 'WorkoutDeleteSuccess';
  id: Scalars['ID'];
};

export type WorkoutDoesNotExist = {
  __typename?: 'WorkoutDoesNotExist';
  message: Scalars['String'];
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  exercise: Exercise;
  id: Scalars['ID'];
  maxReps: Scalars['Int'];
  minReps: Scalars['Int'];
  setCount: Scalars['Int'];
  sets: Array<Set>;
};

export type WorkoutExerciseDoesNotExist = {
  __typename?: 'WorkoutExerciseDoesNotExist';
  id: Scalars['ID'];
};

export type ExerciseFragment = { __typename?: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> };

export type SetFragment = { __typename?: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } };

export type UserDataFragment = { __typename?: 'User', id: string, email: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> }>, workouts: Array<{ __typename?: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> }>, sets: Array<{ __typename?: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } }> };

export type WorkoutFragment = { __typename?: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> };

export type WorkoutExerciseFragment = { __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } };

export type AddExerciseToWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  exerciseId: Scalars['ID'];
  setCount: Scalars['Int'];
  maxReps: Scalars['Int'];
  minReps: Scalars['Int'];
}>;


export type AddExerciseToWorkoutMutation = { __typename?: 'Mutation', addExerciseToWorkout: { __typename: 'DuplicateWorkoutExercise' } | { __typename: 'InvalidRepAmount' } | { __typename: 'InvalidSetAmount' } | { __typename: 'NotLoggedIn' } | { __typename: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } } };

export type CreateExerciseMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename: 'DuplicateExerciseName' } | { __typename: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> } | { __typename: 'NotLoggedIn' } };

export type CreateSetMutationVariables = Exact<{
  workoutExerciseId: Scalars['ID'];
  reps: Scalars['Int'];
  rpe: Scalars['Int'];
  weight: Scalars['Int'];
}>;


export type CreateSetMutation = { __typename?: 'Mutation', createSet: { __typename: 'NotLoggedIn' } | { __typename: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } } | { __typename: 'WorkoutExerciseDoesNotExist' } };

export type CreateWorkoutMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename: 'DuplicateWorkoutName' } | { __typename: 'NotLoggedIn' } | { __typename: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: { __typename: 'ExerciseDeleteSuccess' } | { __typename: 'ExerciseDoesNotExist' } | { __typename: 'NotLoggedIn' } };

export type DeleteWorkoutMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout: { __typename: 'NotLoggedIn' } | { __typename: 'WorkoutDeleteSuccess' } | { __typename: 'WorkoutDoesNotExist' } };

export type EditExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type EditExerciseMutation = { __typename?: 'Mutation', changeExerciseName: { __typename: 'DuplicateExerciseName' } | { __typename: 'Exercise' } | { __typename: 'ExerciseDoesNotExist' } | { __typename: 'NotLoggedIn' } };

export type EditWorkoutMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type EditWorkoutMutation = { __typename?: 'Mutation', changeWorkoutName: { __typename: 'DuplicateWorkoutName' } | { __typename: 'NotLoggedIn' } | { __typename: 'Workout' } | { __typename: 'WorkoutDoesNotExist' } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AlreadyLoggedIn' } | { __typename: 'InvalidLoginCredentials' } | { __typename: 'User', id: string, email: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> }>, workouts: Array<{ __typename?: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> }>, sets: Array<{ __typename?: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } }> } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'EmailAlreadyExists' } | { __typename: 'User' } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'NotLoggedIn' } | { __typename?: 'User', id: string, email: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> }>, workouts: Array<{ __typename?: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> }>, sets: Array<{ __typename?: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } }> } };

export const ExerciseFragmentDoc = gql`
    fragment Exercise on Exercise {
  id
  name
  sets {
    id
  }
}
    `;
export const WorkoutExerciseFragmentDoc = gql`
    fragment WorkoutExercise on WorkoutExercise {
  id
  setCount
  minReps
  maxReps
  exercise {
    id
  }
}
    `;
export const WorkoutFragmentDoc = gql`
    fragment Workout on Workout {
  id
  name
  workoutExercises {
    ...WorkoutExercise
  }
}
    ${WorkoutExerciseFragmentDoc}`;
export const SetFragmentDoc = gql`
    fragment Set on Set {
  id
  created
  weight
  reps
  rpe
  exercise {
    id
  }
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  email
  exercises {
    ...Exercise
  }
  workouts {
    ...Workout
  }
  sets {
    ...Set
  }
}
    ${ExerciseFragmentDoc}
${WorkoutFragmentDoc}
${SetFragmentDoc}`;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($workoutId: ID!, $exerciseId: ID!, $setCount: Int!, $maxReps: Int!, $minReps: Int!) {
  addExerciseToWorkout(
    workoutId: $workoutId
    exerciseId: $exerciseId
    setCount: $setCount
    maxReps: $maxReps
    minReps: $minReps
  ) {
    __typename
    ... on WorkoutExercise {
      ...WorkoutExercise
    }
  }
}
    ${WorkoutExerciseFragmentDoc}`;
export type AddExerciseToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;

/**
 * __useAddExerciseToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseToWorkoutMutation, { data, loading, error }] = useAddExerciseToWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      setCount: // value for 'setCount'
 *      maxReps: // value for 'maxReps'
 *      minReps: // value for 'minReps'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, options);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($name: String!) {
  createExercise(name: $name) {
    __typename
    ... on Exercise {
      ...Exercise
    }
  }
}
    ${ExerciseFragmentDoc}`;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const CreateSetDocument = gql`
    mutation CreateSet($workoutExerciseId: ID!, $reps: Int!, $rpe: Int!, $weight: Int!) {
  createSet(
    workoutExerciseId: $workoutExerciseId
    reps: $reps
    rpe: $rpe
    weight: $weight
  ) {
    __typename
    ... on Set {
      ...Set
    }
  }
}
    ${SetFragmentDoc}`;
export type CreateSetMutationFn = Apollo.MutationFunction<CreateSetMutation, CreateSetMutationVariables>;

/**
 * __useCreateSetMutation__
 *
 * To run a mutation, you first call `useCreateSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetMutation, { data, loading, error }] = useCreateSetMutation({
 *   variables: {
 *      workoutExerciseId: // value for 'workoutExerciseId'
 *      reps: // value for 'reps'
 *      rpe: // value for 'rpe'
 *      weight: // value for 'weight'
 *   },
 * });
 */
export function useCreateSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetMutation, CreateSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetMutation, CreateSetMutationVariables>(CreateSetDocument, options);
      }
export type CreateSetMutationHookResult = ReturnType<typeof useCreateSetMutation>;
export type CreateSetMutationResult = Apollo.MutationResult<CreateSetMutation>;
export type CreateSetMutationOptions = Apollo.BaseMutationOptions<CreateSetMutation, CreateSetMutationVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($name: String!) {
  createWorkout(name: $name) {
    __typename
    ... on Workout {
      ...Workout
    }
  }
}
    ${WorkoutFragmentDoc}`;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const DeleteExerciseDocument = gql`
    mutation DeleteExercise($id: ID!) {
  deleteExercise(id: $id) {
    __typename
  }
}
    `;
export type DeleteExerciseMutationFn = Apollo.MutationFunction<DeleteExerciseMutation, DeleteExerciseMutationVariables>;

/**
 * __useDeleteExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseMutation, { data, loading, error }] = useDeleteExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, options);
      }
export type DeleteExerciseMutationHookResult = ReturnType<typeof useDeleteExerciseMutation>;
export type DeleteExerciseMutationResult = Apollo.MutationResult<DeleteExerciseMutation>;
export type DeleteExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>;
export const DeleteWorkoutDocument = gql`
    mutation DeleteWorkout($id: ID!) {
  deleteWorkout(id: $id) {
    __typename
  }
}
    `;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, options);
      }
export type DeleteWorkoutMutationHookResult = ReturnType<typeof useDeleteWorkoutMutation>;
export type DeleteWorkoutMutationResult = Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;
export const EditExerciseDocument = gql`
    mutation EditExercise($id: ID!, $name: String!) {
  changeExerciseName(id: $id, name: $name) {
    __typename
  }
}
    `;
export type EditExerciseMutationFn = Apollo.MutationFunction<EditExerciseMutation, EditExerciseMutationVariables>;

/**
 * __useEditExerciseMutation__
 *
 * To run a mutation, you first call `useEditExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editExerciseMutation, { data, loading, error }] = useEditExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditExerciseMutation(baseOptions?: Apollo.MutationHookOptions<EditExerciseMutation, EditExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditExerciseMutation, EditExerciseMutationVariables>(EditExerciseDocument, options);
      }
export type EditExerciseMutationHookResult = ReturnType<typeof useEditExerciseMutation>;
export type EditExerciseMutationResult = Apollo.MutationResult<EditExerciseMutation>;
export type EditExerciseMutationOptions = Apollo.BaseMutationOptions<EditExerciseMutation, EditExerciseMutationVariables>;
export const EditWorkoutDocument = gql`
    mutation EditWorkout($id: ID!, $name: String!) {
  changeWorkoutName(id: $id, name: $name) {
    __typename
  }
}
    `;
export type EditWorkoutMutationFn = Apollo.MutationFunction<EditWorkoutMutation, EditWorkoutMutationVariables>;

/**
 * __useEditWorkoutMutation__
 *
 * To run a mutation, you first call `useEditWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editWorkoutMutation, { data, loading, error }] = useEditWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<EditWorkoutMutation, EditWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditWorkoutMutation, EditWorkoutMutationVariables>(EditWorkoutDocument, options);
      }
export type EditWorkoutMutationHookResult = ReturnType<typeof useEditWorkoutMutation>;
export type EditWorkoutMutationResult = Apollo.MutationResult<EditWorkoutMutation>;
export type EditWorkoutMutationOptions = Apollo.BaseMutationOptions<EditWorkoutMutation, EditWorkoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on User {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    __typename
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ... on User {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;