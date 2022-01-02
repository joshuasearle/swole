import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Set } from "./Set.entity"
import { User } from "./User.entity"
import { WorkoutExercise } from "./WorkoutExercise.entity"

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column("varchar", {
    length: 255,
    unique: true,
  })
  name: string

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: "CASCADE" })
  user: User

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise
  )
  workoutExercises: WorkoutExercise[]

  @Field(() => [Set])
  @OneToMany(() => Set, (set) => set.exercise)
  sets: Set[]
}
