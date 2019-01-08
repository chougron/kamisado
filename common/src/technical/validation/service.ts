import * as flat from 'flat';
import validateJs from 'validate.js';
import { REQUIRED } from './rules';

export function makeAllRequired<T extends object>(partialRules: T): T {
  return Object.keys(partialRules).reduce(
    (rules, key) => ({
      ...rules,
      [key]: {
        ...REQUIRED,
        ...partialRules[key],
      },
    }),
    // Not able to type this properly
    {} as any,
  );
}

function checkExtraKeys(values: object, rules: object) {
  const allowedKeys = Object.keys(rules).map(key => key.split('.')[0]);
  const extraKeys = Object.keys(values).filter(key => !allowedKeys.includes(key));

  return extraKeys.length === 0
    ? undefined
    : extraKeys.reduce(
        (errors, key) => ({
          ...errors,
          [key]: ['forbidden'],
        }),
        {},
      );
}

export function validate(values: object, rules: object) {
  const validationErrors = flat.unflatten(validateJs(values, rules));
  const extraKeysError = checkExtraKeys(values, rules);

  if (validationErrors || extraKeysError) {
    return {
      ...validationErrors,
      ...extraKeysError,
    };
  }

  return undefined;
}
