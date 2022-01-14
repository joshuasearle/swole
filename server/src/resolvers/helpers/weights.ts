export const lbToKg = (weight: number) => {
  return weight / 2.20462
}

export const kgToGrams = (weight: number) => {
  const grams = +(weight * 1000).toFixed(0)
  return grams
}

export const gramsToKg = (weight: number) => {
  const kg = weight / 1000
  // Round to nearest .25
  const rounded = +(Math.round(kg * 4) / 4).toFixed(2)
  return rounded
}

export const gramsToLb = (weight: number) => {
  const lb = kgToLb(weight / 1000)
  const rounded = Math.round(lb)
  return rounded
}

export const kgToLb = (weight: number) => {
  return weight * 2.20462
}
