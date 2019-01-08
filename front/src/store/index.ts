import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

import { IState as IGameState } from "../reducers/game";
import { IState as IMultiplayerState } from "../reducers/multiplayer";

export interface IState {
  game: IGameState;
  multiplayer: IMultiplayerState;
}

const store: Store<IState, AnyAction> = createStore(
  rootReducer,
  composeWithDevTools({})(applyMiddleware(thunk))
);

export default store;
