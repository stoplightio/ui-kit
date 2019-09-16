import {
  HTMLInputProps,
  Icon,
  IInputGroupProps,
  InputGroup,
  ITooltipProps,
  Position,
  Tooltip,
} from '@blueprintjs/core';
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
  errors?: string[];
  validationTooltipProps?: Partial<ITooltipProps>;
}

const FormInput: React.FunctionComponent<IInputGroupProps & IFormInputProps & HTMLInputProps> = ({
  onEnter,
  schema,
  value,
  errors,
  validationTooltipProps,
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
      rightElement={
        <FormInputValidation
          value={value}
          schema={schema}
          size={size}
          errors={errors}
          tooltipProps={validationTooltipProps}
        />
      }
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
  size: Size;
  schema?: yup.Schema<any>;
  errors?: string[];
  tooltipProps?: Partial<ITooltipProps>;
}

const FormInputValidation: React.FunctionComponent<IFormInputValidationProps> = ({
  value,
  schema,
  size,
  errors = [],
  tooltipProps,
}) => {
  const errs = useValidateSchema(schema, value, { abortEarly: false }).concat(errors);
  if (!errs.length) return null;

  return (
    <Tooltip
      content={
        errs.length > 1 ? (
          <ul>
            {errs.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        ) : (
          errs[0]
        )
      }
      position={Position.BOTTOM_RIGHT}
      intent="danger"
      {...tooltipProps}
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
