export const addMeal = (meal, portionSize) => {
  return { type: 'ADD_MEAL', meal: meal, portionSize: portionSize}
}

export const deleteMeal = (id) => {
  return { type: 'DELETE_MEAL', id: id}
}
