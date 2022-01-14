import { Field, ID, Int, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Exercise } from "./Exercise.entity"
import { User } from "./User.entity"
import { Workout } from "./Workout.entity"
import { WorkoutExercise } from "./WorkoutExercise.entity"

@ObjectType()
@Entity()
export class Set extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => Date)
  @CreateDateColumn()
  created!: Date

  @Field(() => Int)
  @Column("smallint")
  weight!: number

  @Field(() => Int)
  @Column("smallint")
  reps!: number

  @Field(() => Int)
  @Column("smallint")
  rpe!: number

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.sets, {
    onDelete: "CASCADE",
  })
  exercise!: Exercise

  @Field(() => Workout)
  @ManyToOne(() => Workout, (workout) => workout.sets, {
    onDelete: "SET NULL",
  })
  workout!: Workout

  @Field(() => WorkoutExercise)
  @ManyToOne(() => WorkoutExercise, (workoutExercise) => workoutExercise.sets, {
    onDelete: "SET NULL",
  })
  workoutExercise!: WorkoutExercise

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: "CASCADE" })
  user!: User
}
