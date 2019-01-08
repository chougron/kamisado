import { REQUIRED } from '../../technical/validation/rules';

const loginValidation = {
  username: {
    ...REQUIRED('The username is required.'),
  },
};

export { loginValidation };
