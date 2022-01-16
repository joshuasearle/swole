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

export type ChangeExerciseNameResult = Exercise | ExerciseDoesNotExist | NotLoggedIn;

export type ChangeSetResult = NotLoggedIn | Set | SetDoesNotExist;

export type ChangeWorkoutNameResult = NotLoggedIn | Workout | WorkoutDoesNotExist;

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

export type UserDataFragment = { __typename?: 'User', id: string, email: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string, sets: Array<{ __typename?: 'Set', id: string }> }>, workouts: Array<{ __typename?: 'Workout', id: string, name: string, workoutExercises: Array<{ __typename?: 'WorkoutExercise', id: string, setCount: number, minReps: number, maxReps: number, exercise: { __typename?: 'Exercise', id: string } }> }>, sets: Array<{ __typename?: 'Set', id: string, created: any, weight: number, reps: number, rpe: number, exercise: { __typename?: 'Exercise', id: string } }> };

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
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  email
  exercises {
    ...Exercise
  }
  workouts {
    id
    name
    workoutExercises {
      id
      setCount
      minReps
      maxReps
      exercise {
        id
      }
    }
  }
  sets {
    id
    created
    weight
    reps
    rpe
    exercise {
      id
    }
  }
}
    ${ExerciseFragmentDoc}`;
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