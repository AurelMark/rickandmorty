import { combineReducers } from "redux";

import character from "./character";
import system from "./system";
import location from "./location";
import episode from "./episode";

const rootReducer = combineReducers({ character, system, location, episode });

export default rootReducer;
