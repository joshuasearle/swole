import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Exercise } from "./Exercise.entity"
import { Set } from "./Set.entity"
import { Workout } from "./Workout.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column("varchar", {
    length: 255,
    unique: true,
  })
  email: string

  @Column("varchar", {
    length: 255,
  })
  password: string

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[]

  @Field(() => [Workout])
  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[]

  @Field(() => [Set])
  @OneToMany(() => Set, (set) => set.user)
  sets: Set[]
}
