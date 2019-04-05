import { HTMLInputProps, Icon, IInputGroupProps, InputGroup, Position, Tooltip } from '@blueprintjs/core';
import { Dictionary } from '@stoplight/types';
import cn from 'classnames';
import { compact } from 'lodash';
import * as React from 'react';

// TODO: should probably use ajv and json schema
import * as yup from 'yup';

export interface IFormInputProps {
  value: IInputGroupProps['value'];
  onEnter?: Function;
  schema?: yup.Schema<any>;
}

export const FormInput: React.FunctionComponent<IInputGroupProps & IFormInputProps & HTMLInputProps> = ({
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

export interface IFormInputValidationProps {
  value: IInputGroupProps['value'];
  schema: yup.Schema<any>;
  size: Size;
}

const FormInputValidation: React.FunctionComponent<IFormInputValidationProps> = ({ value, schema, size }) => {
  const [validations, setValidations] = React.useState<string[]>([]);

  React.useEffect(() => {
    const validationDescription = schema.describe();

    setValidations(
      compact(
        validationDescription.tests.map((t: any) => {
          const params: any = t.params || {};
          if (validationDescription.type === 'string') {
            if (t.name === 'min') {
              return `at least ${params.min} letters`;
            } else if (t.name === 'max') {
              return `at most ${params.max} letters`;
            }

            return null;
          }

          return null;
        })
      )
    );
  }, [schema]);

  const [validationError, setValidationError] = React.useState(false);
  async function validate() {
    try {
      await schema.validateSync(value);
    } catch (e) {
      setValidationError(true);
    }
  }

  React.useEffect(() => {
    setValidationError(false);
    validate();
  });

  if (!validations || !validations.length) return null;

  return (
    <Tooltip
      content={
        <>
          {validations.map((v, i) => (
            <div key={i}>{v}</div>
          ))}
        </>
      }
      position={Position.BOTTOM_RIGHT}
      intent={validationError ? 'warning' : 'success'}
    >
      <div tabIndex={-1} style={{ padding: iconPadding[size] }}>
        <Icon
          icon={validationError ? 'circle' : 'tick-circle'}
          className={cn({
            'text-gray-3 dark:text-gray-6': validationError,
          })}
          iconSize={size === 'small' ? 12 : Icon.SIZE_STANDARD}
          intent={validationError ? 'none' : 'success'}
        />
      </div>
    </Tooltip>
  );
};
