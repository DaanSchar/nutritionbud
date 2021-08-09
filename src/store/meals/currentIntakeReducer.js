import { intakeData } from "../../../assets/data/intakeData";

const initialState = intakeData

export const currentIntakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEAL':
      return addMeal(state, action);
    case 'DELETE_MEAL':
      return deleteMeal(state, action);
  }
  return state;
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
    totalCalories: state.totalCalories + newMeal.meal.calories * newMeal.portionSize,
    totalProtein: state.totalProtein + newMeal.meal.protein * newMeal.portionSize,
    totalFat: state.totalFat + newMeal.meal.fat * newMeal.portionSize,
    totalCarbohydrates: state.totalCarbohydrates + newMeal.meal.carbohydrates * newMeal.portionSize,
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
    if (state.meals[i].id === action.id) {
      mealIndex = i;
      break;
    }
  }

  let meal = state.meals[mealIndex];
  state.meals.splice(mealIndex, 1)

  return {
    ...state,
    totalCalories: state.totalCalories - meal.meal.calories * meal.portionSize,
    totalProtein: state.totalProtein - meal.meal.protein * meal.portionSize,
    totalFat: state.totalFat - meal.meal.fat * meal.portionSize,
    totalCarbohydrates: state.totalCarbohydrates - meal.meal.carbohydrates * meal.portionSize,
    meals: [...state.meals],
  }



  return state;
}



