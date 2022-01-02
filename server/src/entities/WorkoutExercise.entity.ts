import { Field, ID, Int, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Exercise } from "./Exercise.entity"
import { Workout } from "./Workout.entity"

@ObjectType()
@Entity()
export class WorkoutExercise extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => Int)
  @Column("smallint")
  sets: number

  @Field(() => Int)
  @Column("smallint")
  minReps: number

  @Field(() => Int)
  @Column("smallint")
  maxReps: number

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    onDelete: "CASCADE",
  })
  workout: Workout

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises, {
    onDelete: "CASCADE",
  })
  exercise: Exercise
}