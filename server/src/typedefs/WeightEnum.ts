import { registerEnumType } from "type-graphql"

export enum Weight {
  KG,
  LB,
}

export const WeightEnum = registerEnumType(Weight, {
  name: "Weight",
  description: "Kilograms or pounds",
})
