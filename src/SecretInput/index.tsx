import * as React from 'react';

import { Button, IInputGroupProps, InputGroup, Tooltip } from '@blueprintjs/core';

export interface ISecretInputProps extends IInputGroupProps {
  selectOnFocus?: boolean;
}

export const SecretInput = ({ selectOnFocus = false, ...props }: ISecretInputProps) => {
  const [visible, setVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onRef = React.useCallback(el => (inputRef.current = el), []);

  const onClick = React.useCallback(() => {
    setVisible(!visible);
    const input = inputRef.current;
    if (input !== null) {
      input.focus();
      // Selection needs to happen after input has been focused
      setTimeout(() => input.select());
    }
  }, [visible]);

  return (
    <InputGroup
      inputRef={onRef}
      rightElement={
        <Tooltip content={`${visible ? 'Hide' : 'Reveal'}`} disabled={props.disabled}>
          <Button icon={visible ? 'eye-open' : 'eye-off'} onClick={onClick} minimal={true} />
        </Tooltip>
      }
      type={visible ? 'text' : 'password'}
      onFocus={e => selectOnFocus && e.target.select()}
      {...props}
    />
  );
};
