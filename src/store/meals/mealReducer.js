import {foodData} from "../../../assets/data/foodData";

const initialState = foodData;

export const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_MEAL':
            return createMeal(state, action);
    }
    return state;
}

function createMeal(state, action) {
    return [...state, action.meal];
}
