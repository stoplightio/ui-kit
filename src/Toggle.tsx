import * as React from 'react';
import { styled } from './utils';

export interface IToggleProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  width?: string;
  height?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Label = styled<any, 'label'>('label')({
  // @ts-ignore
  display: 'inline-block',
  input: {
    margin: 0,
  },
  'input[type="checkbox"]:focus + span': {
    boxShadow: '0 0 0 3px rgba(48, 142, 218, 0.25)',
  },
});

const Knob = styled<any, 'span'>('span')(
  {
    // @ts-ignore
    display: 'block',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' color='%23FFF'%3E%3Ccircle cx='7' cy='7' r='5' fill='currentColor'/%3E%3C/svg%3E")`,
    margin: 0,
    padding: 0,
    transition:
      'box-shadow .1s ease-in-out,background-color .15s ease-in-out,background-position .15s ease-in-out,color .25s ease-in-out',
    borderRadius: '100px',
    boxSizing: 'border-box',
    backgroundColor: 'darkgrey',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundSize: 'contain',
    cursor: 'pointer',
  },
  // @ts-ignore
  ({ width, height }) => ({
    width: width || '40px',
    height: height || '20px',
  }),
  // @ts-ignore
  ({ checked }) =>
    checked && {
      backgroundPosition: '100% 0',
      backgroundColor: 'mediumseagreen',
    },
  // @ts-ignore
  ({ disabled }) =>
    disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);

export const Toggle = styled<IToggleProps>((props: IToggleProps) => {
  const { id, className, checked, width, height, disabled, onChange } = props;

  return (
    <span className={className}>
      <Label>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{
            position: 'absolute',
            clip: 'rect(1px, 1px, 1px, 1px)',
          }}
        />
        <Knob checked={checked} width={width} height={height} disabled={disabled} />
      </Label>
    </span>
  );
})``;
