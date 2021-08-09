import { combineReducers, createStore } from "redux";
import { currentIntakeReducer } from "./meals/currentIntakeReducer";

const rootReducer = combineReducers({
  currentIntake: currentIntakeReducer,
});

const store = createStore(rootReducer);
export default store
