import Redux from 'redux';
import { IState } from '../store';
import { call } from '../utils/api';
import { isNull } from 'util';

export type LOGIN_ANSWER = 'LOGIN_ANSWER';
export const LOGIN_ANSWER: LOGIN_ANSWER = 'LOGIN_ANSWER';

export interface ILoginAnswerAction {
  type: LOGIN_ANSWER;
  username: string;
  error: boolean;
}

export type LOGIN = 'LOGIN';
export const LOGIN: LOGIN = 'LOGIN';

export interface ILoginAction {
  type: LOGIN;
}

export const LoginAnswerAction = (username: string, error: boolean): ILoginAnswerAction => {
  return { type: LOGIN_ANSWER, username, error };
};

const LoginAction = (): ILoginAction => {
  return { type: LOGIN };
};

export async function login(username: string, password: string) {
  return async (dispatch: Redux.Dispatch, getState: () => IState) => {
    dispatch(LoginAction());
    const answer = await call('POST', '/v1/player/login', { username, password });
    if (isNull(answer)) {
      return dispatch(LoginAnswerAction('', true));
    }
    if (answer.data && answer.data.username && answer.data.username !== '') {
      return dispatch(LoginAnswerAction(answer.data.username, false));
    }

    return dispatch(LoginAnswerAction('', true));
  };
}
