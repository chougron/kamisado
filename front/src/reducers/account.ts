import { IOtherAction } from '../actions';
import { ILoginAnswerAction } from '../actions/account';

export interface IState {
  username: string;
  loginError: boolean;
}

export const initialState: IState = {
  username: '',
  loginError: false,
};

function handleLoginAnswer(state: IState, username: string, error: boolean): IState {
  return {
    ...state,
    username,
    loginError: error,
  };
}

type Action = IOtherAction | ILoginAnswerAction;

const accountReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case 'LOGIN_ANSWER':
      return handleLoginAnswer(state, action.username, action.error);
    default:
      return state;
  }
};

export default accountReducer;
