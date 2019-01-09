import validate from 'validate.js';

// The declaration file does not support this field
(validate as any).options = {
  fullMessages: false,
};

export const REQUIRED = (message: string) => ({
  presence: { message, allowEmpty: false },
});

export const ALPHABETICAL = (message: string) => ({
  format: {
    message,
    pattern: /^[^±!@£$%^&*+§¡€#¢§¶•ªº«\\/<>?:;|=€©\d]{1,50}$/,
    flags: 'i',
  },
});

export const NUMERIC = (message: string) => ({
  numericality: {
    onlyInteger: true,
    notValid: message,
    notInteger: message,
    notGreaterThanOrEqualTo: message,
    notLessThanOrEqualTo: message,
  },
});

export const IDENTIC = (otherField: string, message: string) => ({
  identic: { otherField, message },
});

export const INTEGER = {
  numericality: {
    onlyInteger: true,
    notValid: 'wrong_number_format',
    notInteger: 'wrong_number_format',
    notGreaterThanOrEqualTo: 'not_gte',
    notLessThanOrEqualTo: 'not_lte',
    noStrings: true,
  },
};

export const NUMBER = {
  numericality: {
    onlyInteger: false,
    notValid: 'wrong_number_format',
    notGreaterThanOrEqualTo: 'not_gte',
    notLessThanOrEqualTo: 'not_lte',
    noStrings: true,
  },
};

export const BOOLEAN = {
  inclusion: {
    within: [true, false],
    message: 'wrong_boolean_format',
  },
};

export const INTEGER_RANGE = (min: number, max: number) => ({
  numericality: {
    ...INTEGER.numericality,
    greaterThanOrEqualTo: min,
    lessThanOrEqualTo: max,
  },
});

export const LENGTH_RANGE = (min: number, max: number, messageShort: string, messageLong: string) => ({
  length: {
    minimum: min,
    maximum: max,
    tooShort: messageShort,
    tooLong: messageLong,
    getVariables: () => ({
      minimum: min,
      maximum: max,
    }),
  },
});

export const ENUM = <T>(enumObject: T) => ({
  inclusion: { within: Object.values(enumObject), message: 'not_in_enum' },
});

interface OnlyForKeyOptions {
  key: string;
  values: {
    [key: string]: {};
  };
}

validate.validators.onlyForKey = (
  value: unknown,
  options: OnlyForKeyOptions,
  key: string,
  attributes: any,
): string[] | undefined => {
  if (!Object.keys(options.values).includes(attributes[options.key])) {
    if (key in attributes) {
      return ['forbidden'];
    }
    return;
  }
  return validate.single(value, options.values[attributes[options.key]]);
};

interface IdenticOptions {
  otherField: string;
  message: string;
}

validate.validators.identic = (
  value: unknown,
  options: IdenticOptions,
  key: string,
  attributes: any,
): string[] | undefined => {
  if (!attributes[options.otherField] || attributes[options.otherField] !== value) {
    return [options.message];
  }
  return;
};

export const ONLY_FOR_KEY = ({ key, values }: OnlyForKeyOptions) => ({
  onlyForKey: { key, values },
});
