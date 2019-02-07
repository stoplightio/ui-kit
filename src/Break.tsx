import * as React from 'react';

import { Box, IBox } from './Box';

export interface IBreak extends IBox<HTMLHRElement | HTMLElement> {
  thickness?: number;
}
export const Break: React.FunctionComponent<IBreak> = props => {
  const { as = 'hr', thickness = 1, ...rest } = props;

  return <Box {...rest} as={as} css={breakStyles({ thickness })} />;
};

export const breakStyles = ({ thickness }: IBreak) => [
  {
    border: '0 none',
    borderTop: `${thickness}px solid`,
    height: 0,
    margin: '0 auto',
  },
];
