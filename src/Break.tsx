import { style } from 'styled-system';
import { Box, IBoxProps } from './Box';
import { styled } from './utils';

export const thickness = style({
  prop: 'thickness',
  cssProperty: 'border-width',
  transformValue: (value: number | string) => `${value}px`,
});

export interface IBreakProps extends IBoxProps {
  thickness?: number;
}

export const Break = styled<IBreakProps, 'hr'>(Box as any).attrs({
  borderStyle: 'solid',
})(thickness);

Break.defaultProps = {
  as: 'hr',
  thickness: 1,
};
