import { combineReducers, createStore } from "redux";
import { currentIntakeReducer } from "./meals/currentIntakeReducer";
import {ScannerReducer} from "./scanner/ScannerReducer";
import {mealReducer} from "./meals/mealReducer";

const rootReducer = combineReducers({
  currentIntake: currentIntakeReducer,
  Scanner: ScannerReducer,
  meals: mealReducer,
});

const store = createStore(rootReducer);
export default store
