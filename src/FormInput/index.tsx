import { HTMLInputProps, Icon, IInputGroupProps, InputGroup, Position, Tooltip } from '@blueprintjs/core';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { useValidateSchema } from '../_hooks/useValidateSchema';

// TODO: should probably use ajv and json schema
import * as yup from 'yup';

/**
 * FORM INPUT
 */
interface IFormInputProps {
  value: IInputGroupProps['value'];
  onEnter?: Function;
  schema?: yup.Schema<any>;
}

const FormInput: React.FunctionComponent<IInputGroupProps & IFormInputProps & HTMLInputProps> = ({
  onEnter,
  schema,
  value,
  ...props
}) => {
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onEnter) onEnter();
  }

  let size: Size = 'default';
  if (props.large) {
    size = 'large';
  } else if (props.small) {
    size = 'small';
  }

  return (
    <InputGroup
      value={value}
      autoComplete="off"
      onKeyPress={handleEnter}
      rightElement={schema ? <FormInputValidation value={value} schema={schema} size={size} /> : undefined}
      {...props}
    />
  );
};

type Size = 'small' | 'default' | 'large';
const iconPadding: Dictionary<string, Size> = {
  small: '1px 6px',
  default: '6px',
  large: '11px',
};

/**
 * FORM INPUT VALIDATIONS
 */

interface IFormInputValidationProps {
  value: IInputGroupProps['value'];
  schema: yup.Schema<any>;
  size: Size;
}

const FormInputValidation: React.FunctionComponent<IFormInputValidationProps> = ({ value, schema, size }) => {
  const errors = useValidateSchema(schema, value, { abortEarly: false });

  if (!errors) return null;

  return (
    <Tooltip
      content={
        <ul>
          {errors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      }
      position={Position.BOTTOM_RIGHT}
      intent="danger"
    >
      <div tabIndex={-1} style={{ padding: iconPadding[size] }}>
        <Icon icon="circle" iconSize={size === 'small' ? 12 : Icon.SIZE_STANDARD} intent="danger" />
      </div>
    </Tooltip>
  );
};

/**
 * EXPORTS
 */
export { FormInput, IFormInputProps, IFormInputValidationProps };
