import { Omit } from '@stoplight/types';
import _noop = require('lodash/noop');
import * as React from 'react';
// TODO: should probably use ajv and json schema
import * as yup from 'yup';

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
  onClick = _noop,
  ...buttonProps
}) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);

  async function validate() {
    if (!schema) return;
    try {
      await schema.validateSync(data);
    } catch (e) {
      setIsValid(false);
    }
  }

  React.useEffect(() => {
    setIsValid(true);
    validate();
  }, [data, schema]);

  return (
    <Button
      disabled={!isValid || loading || disabled}
      loading={loading}
      onClick={() => onClick(data)}
      {...buttonProps}
    />
  );
};

/**
 * EXPORTS
 */
export { IFormButton, FormButton };
