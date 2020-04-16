import { noop } from 'lodash';
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
interface IFormButton extends Omit<IButtonProps, 'type' | 'onClick'> {
  schema?: yup.Schema<any>;
  data?: any;
  onClick?: (data: any) => void;
}

const FormButton: React.FunctionComponent<IFormButton> = ({
  schema,
  data,
  loading,
  disabled,
  onClick = noop,
  ...buttonProps
}) => {
  const { errors, isStale } = useValidateSchema(schema, data);
  const handleClick = React.useCallback(() => onClick(data), [onClick, data]);

  return (
    <Button
      disabled={errors.length > 0 || isStale || loading || disabled}
      loading={loading}
      onClick={handleClick}
      {...buttonProps}
    />
  );
};

/**
 * EXPORTS
 */
export { IFormButton, FormButton };
