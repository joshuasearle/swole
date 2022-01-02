import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./User.entity"
import { WorkoutExercise } from "./WorkoutExercise.entity"

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column("varchar", {
    length: 255,
    unique: true,
  })
  name: string

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: "CASCADE" })
  user: User

  @Field(() => [WorkoutExercise])
  @OneToMany(
    () => WorkoutExercise,
    (workoutExercises) => workoutExercises.workout
  )
  workoutExercises: WorkoutExercise[]
}
