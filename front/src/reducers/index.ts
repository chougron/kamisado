import { combineReducers } from "redux";

import game from "./game";
import multiplayer from "./multiplayer";

const reducers = combineReducers({ game, multiplayer });

export default reducers;
