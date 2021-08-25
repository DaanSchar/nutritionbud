import * as mealApiService from "../../services/mealApiService";

const initialState = {
  macros: {
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbohydrates: 0,
  },
  intakes: []
}

export const currentIntakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INTAKE':
      return addIntake(state, action);
    case 'DELETE_INTAKE':
      return deleteIntake(state, action);
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
    intakes: [...action.data]
  }
}

function addIntake(state, action) {
  let intakes = [...state.intakes];
  let intake = {portionSize: action.portionSize, meal: action.meal}

  intakes = [...intakes, intake];

  let macros = {
    totalCalories: state.macros.totalCalories + intake.meal.calories * intake.portionSize,
    totalProtein: state.macros.totalProtein + intake.meal.protein * intake.portionSize,
    totalFat: state.macros.totalFat + intake.meal.fat * intake.portionSize,
    totalCarbohydrates: state.macros.totalCarbohydrates + intake.meal.carbohydrates * intake.portionSize,
  }

  return {
    ...state,
    macros: macros,
    intakes: intakes,
  }
}

function deleteIntake(state, action) {

  let mealIndex;


  for (let i = 0; i < state.intakes.length; i++) {
    if (intakesAreTheSame(state.intakes[i], action.meal)) {
      mealIndex = i;
      break;
    }
  }

  let meal = state.intakes[mealIndex];
  state.intakes.splice(mealIndex, 1)

  let macros = {
    totalCalories: state.macros.totalCalories - meal.meal.calories * meal.portionSize,
    totalProtein: state.macros.totalProtein - meal.meal.protein * meal.portionSize,
    totalFat: state.macros.totalFat - meal.meal.fat * meal.portionSize,
    totalCarbohydrates: state.macros.totalCarbohydrates - meal.meal.carbohydrates * meal.portionSize,
  }

  return {
    ...state,
    macros: {...macros },
    intakes: [...state.intakes],
  }

  return state;
}

function intakesAreTheSame(mealA, mealB) {
  if (mealA.meal.id === mealB.meal.id)
    if (mealA.portionSize === mealB.portionSize)
      if (mealA.date === mealB.date)
        return true
  return false
}



