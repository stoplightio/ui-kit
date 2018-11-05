import { styled } from './utils';

export interface ICheckboxProps {
  checked?: boolean;
}

export const Checkbox = styled<ICheckboxProps, 'input'>('input').attrs({
  type: 'checkbox',
})(
  // disabled style
  // @ts-ignore
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);
