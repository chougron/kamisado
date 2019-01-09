import { IDENTIC, REQUIRED } from '../../technical/validation/rules';

const subscribeValidation = {
  username: {
    ...REQUIRED('The username is required.'),
  },
  password: {
    ...REQUIRED('The password is required.'),
  },
  passwordValidation: {
    ...REQUIRED('The password validation is required.'),
    ...IDENTIC('password', 'The passwords are not matching.'),
  },
};

const loginValidation = {
  username: {
    ...REQUIRED('The username is required.'),
  },
  password: {
    ...REQUIRED('The password is required.'),
  },
};

export { subscribeValidation, loginValidation };
