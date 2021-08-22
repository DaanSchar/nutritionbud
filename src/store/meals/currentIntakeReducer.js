const initialState = {
  macros: {
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbohydrates: 0,
  },
  meals: []
}

export const currentIntakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEAL':
      return addMeal(state, action);
    case 'DELETE_MEAL':
      return deleteMeal(state, action);
    case 'SET_MEALS':
      return setMeals(state, action);
    case 'SET_MACROS':
      return setMacros(state, action);
  }
  return state;
}

function setMacros(state, action) {
  let macros = action.data


  return {
    ...state,
    macros: {...macros}
  }
}


function setMeals(state, action) {
  return {
    ...state,
    meals: [...action.data]
  }
}

function addMeal(state, action) {
  let meals = [...state.meals];
  let newMeal = {portionSize: action.portionSize, meal: action.meal}

  let randomId = generateId(10000)

  while (!idExist(state, randomId)) {
    randomId = generateId(1000);
  }
  newMeal.id = randomId.toString();

  meals = [...meals, newMeal];

  return {
    ...state,
    meals: meals,
  }
}

function generateId(max) {
  return Math.floor(Math.random() * max);
}

function idExist(state, id) {
  for (let i = 0; i < state.meals.length; i++)
    if (state.meals[i].id === id)
      return false;
  return true
}


function deleteMeal(state, action) {

  let mealIndex;


  for (let i = 0; i < state.meals.length; i++) {
    if (mealsAreTheSame(state.meals[i], action.meal)) {
      mealIndex = i;
      break;
    }
  }

  let meal = state.meals[mealIndex];
  state.meals.splice(mealIndex, 1)

  let macros = {
    totalCalories: state.macros.totalCalories - meal.meal.calories * meal.portionSize,
    totalProtein: state.macros.totalProtein - meal.meal.protein * meal.portionSize,
    totalFat: state.macros.totalFat - meal.meal.fat * meal.portionSize,
    totalCarbohydrates: state.macros.totalCarbohydrates - meal.meal.carbohydrates * meal.portionSize,
  }

  return {
    ...state,
    macros: {...macros },
    meals: [...state.meals],
  }

  return state;
}

function mealsAreTheSame(mealA, mealB) {
  if (mealA.meal.id === mealB.meal.id)
    if (mealA.portionSize === mealB.portionSize)
      if (mealA.date === mealB.date)
        return true
  return false
}



