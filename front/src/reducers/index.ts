import { combineReducers } from 'redux';

import game from './game';
import multiplayer from './multiplayer';
import account from './account';

const reducers = combineReducers({ game, multiplayer, account });

export default reducers;
