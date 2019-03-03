import * as React from 'react';

import { Box, IBox } from './Box';

export interface IBreak extends IBox<HTMLHRElement | HTMLElement> {
  thickness?: number;
}

export const Break: React.FunctionComponent<IBreak> = React.forwardRef<HTMLHRElement | HTMLElement, IBreak>(
  (props, ref) => {
    const { as = 'hr', thickness = 1, css, ...rest } = props;

    return <Box {...rest} as={as} ref={ref} css={[breakStyles({ thickness }), css]} />;
  }
);

export const breakStyles = ({ thickness }: IBreak) => [
  {
    border: '0 none',
    borderTop: `${thickness}px solid`,
    height: 0,
    margin: '0 auto',
  },
];
