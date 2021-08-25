export const addIntake = (meal, portionSize) => {
  return { type: 'ADD_INTAKE', meal: meal, portionSize: portionSize}
}

export const deleteIntake = (meal) => {
  return { type: 'DELETE_INTAKE', meal: meal}
}

export const setMeals = (data) => {
  return {type: 'SET_MEALS', data: data }
}

export const setMacros = (data) => {
  return {type: 'SET_MACROS', data: data }
}
