import * as React from 'react';

import { Callout } from '../';
import { Dictionary } from '../types';

/**
 * FORM ERROR
 */
interface IFormError {
  validationErrors: Array<{
    property: string;
    constraints: Dictionary<string>;
  }>;

  message?: string;
}

interface IFormErrorProps {
  errors?: ReadonlyArray<IFormError>;
}

const FormError: React.FunctionComponent<IFormErrorProps> = ({ errors }) => {
  if (!errors || !errors.length) return null;

  return (
    <Callout intent="danger" className="mb-5" icon={null}>
      {errors.map((err, i) => {
        if (err.validationErrors) {
          return err.validationErrors.map(v => {
            return Object.values(v.constraints).map(msg => {
              return <div key={msg}>{msg}</div>;
            });
          });
        } else {
          return <div key={i}>{err.message}</div>;
        }
      })}
    </Callout>
  );
};

/**
 * EXPORTS
 */
export { FormError, IFormError, IFormErrorProps };
