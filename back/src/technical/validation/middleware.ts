import express from 'express';
import { validate } from 'kamisado-common/dist/technical/validation/service';

/**
 * Wraps an express middleware to validate its body
 *
 * Returns a 400 with an error body in case of validation failure
 *
 * @param spec Validation rules to send to the validate function
 */
export function validateRequest(spec: object) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validate(req.body, spec);

    if (errors) {
      res.status(400).json({ formErrors: errors });
    } else {
      next();
    }
  };
}
