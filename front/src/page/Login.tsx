import * as React from 'react';
import { IState as GlobalState } from '../store';
import { Dispatch, AnyAction } from 'redux';
import { login } from '../actions/account';
import { connect } from 'react-redux';

interface IStateProps {
  loginError: boolean;
}

interface IDispatchProps {
  login: (username: string, password: string) => void;
}

interface Props {
  goToRegister: () => void;
}

type IProps = IStateProps & IDispatchProps & Props;

interface State {
  error: string;
}

class Login extends React.Component<IProps, State> {
  private usernameInput: HTMLInputElement | null;
  private passwordInput: HTMLInputElement | null;

  constructor(props: IProps) {
    super(props);

    this.state = {
      error: '',
    };

    this.formSubmit = this.formSubmit.bind(this);
  }

  public render() {
    const { goToRegister, loginError } = this.props;
    const { error } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input type="text" name="username" placeholder="Username" ref={el => (this.usernameInput = el)} />
        <br />
        <input type="password" name="password" placeholder="Password" ref={el => (this.passwordInput = el)} />
        <br />
        <input type="submit" value="Login" onClick={this.formSubmit} />
        <br />
        {error !== '' && <div>{error}</div>}
        {loginError && <div>Login/Password Incorrect</div>}
        <br />
        <a onClick={goToRegister}>Register</a>
      </div>
    );
  }

  public async formSubmit() {
    this.setState({ error: '' });
    if (
      !this.usernameInput ||
      !this.passwordInput ||
      this.usernameInput.value === '' ||
      this.passwordInput.value === ''
    ) {
      this.setState({ error: 'The fields are required.' });
      return false;
    }
    await this.props.login(this.usernameInput.value, this.passwordInput.value);

    return false;
  }
}

const mapStateToProps = (state: GlobalState, props: IStateProps): IStateProps => {
  return {
    loginError: state.account.loginError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IDispatchProps): IDispatchProps => {
  return {
    login: (username: string, password: string) => dispatch((login(username, password) as unknown) as AnyAction),
  };
};

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
