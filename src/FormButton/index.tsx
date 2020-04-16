import * as React from 'react';
// TODO: should probably use ajv and json schema
import * as yup from 'yup';

import { useValidateSchema } from '../_hooks/useValidateSchema';
import { Button, IButtonProps } from '../index';

/**
 * FORM BUTTON
 * button that is disabled if the schema doesn't pass validation
 * TODO, add tooltip to explain why its disabled?
 */
type OwnProps<T> = {
  schema?: yup.Schema<T>;
  data?: T;
  onClick?: () => void;
};

type IFormButtonProps<T> = Omit<IButtonProps, 'type' | 'onClick'> & OwnProps<T>;

function FormButton<T>({ schema, data, loading, disabled, onClick, ...buttonProps }: IFormButtonProps<T>) {
  const { errors, isStale } = useValidateSchema(schema, data);

  return (
    <Button
      disabled={errors.length > 0 || isStale || loading || disabled}
      loading={loading}
      onClick={onClick}
      {...buttonProps}
    />
  );
}

/**
 * EXPORTS
 */
export { FormButton };
