export const addMeal = (meal, portionSize) => {
  return { type: 'ADD_MEAL', meal: meal, portionSize: portionSize}
}

export const deleteMeal = (meal) => {
  return { type: 'DELETE_MEAL', meal: meal}
}

export const setMeals = (data) => {
  return {type: 'SET_MEALS', data: data }
}

export const setMacros = (data) => {
  return {type: 'SET_MACROS', data: data }
}
