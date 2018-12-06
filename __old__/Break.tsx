import { style } from 'styled-system';
import { Box, IBoxProps } from './Box';
import { getBorder, styled } from './utils';

export const thickness = style({
  prop: 'thickness',
  cssProperty: 'borderTop',
  transformValue: getBorder,
});

export interface IBreakProps extends IBoxProps {
  thickness?: number;
}

export const Break = styled<IBreakProps, 'hr'>(Box as any)(thickness);

Break.defaultProps = {
  as: 'hr',
  thickness: 1,
  m: '@none',
  borderColor: '@break.border',
};
