import { Callout } from '@blueprintjs/core';
import * as React from 'react';

/**
 * FORM ERROR
 */
interface IFormError {
  message: string;
}

interface IFormErrorProps {
  errors?: ReadonlyArray<IFormError>;
}

const FormError: React.FunctionComponent<IFormErrorProps> = ({ errors }) => {
  if (!errors || !errors.length) return null;

  return (
    <Callout intent="danger" className="mb-5" icon={null}>
      {errors.map((err, i) => (
        <div key={i}>{err.message}</div>
      ))}
    </Callout>
  );
};

/**
 * EXPORTS
 */
export { FormError, IFormError, IFormErrorProps };
