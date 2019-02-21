/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { Flex } from './Flex';
import { useTheme } from './theme';

export interface ICallout extends IBox<HTMLDivElement> {
  invalid?: boolean;
  x: number;
  y: number;
  skew: number;
  tailWidth: number;
  tailHeight: number;
}

export const Callout: React.FunctionComponent<ICallout> = props => {
  const { x, skew = 0, tailWidth = 40, tailHeight = 30, children, ...rest } = props;

  const x1 = 0;
  const y1 = 0;
  const x2 = 400;
  const y2 = 50;
  const tailBase = {
    X: x1 + (x2 - x1) * ((x + skew) / 2 + 0.5),
    Y: y2,
  };
  const tailTip = {
    X: x1 + (x2 - x1) * (x / 2 + 0.5),
    Y: y2 + tailHeight,
  };
  return (
    <Box {...rest} css={calloutStyles(props)}>
      <svg
        viewBox={`${x1} ${y1} ${x2} ${y2 + tailHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        shape-rendering="crispEdges"
      >
        <path
          d={`
M ${x1} ${y1} 
H ${x2}
V ${y2}
H ${Math.min(tailBase.X + tailWidth / 2, x2)}
L ${tailTip.X} ${tailTip.Y}
L ${Math.max(tailBase.X - tailWidth / 2, x1)} ${tailBase.Y}
H ${x1}
z
`}
          style={pathStyles(props)}
        />
      </svg>
      <Flex
        justifyContent="center"
        alignItems="center"
        style={{
          overflow: 'scroll',
          position: 'absolute',
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: `${tailHeight + 7}px`,
        }}
      >
        {children}
      </Flex>
    </Box>
  );
};

const calloutStyles = ({ invalid }: ICallout): IBoxCSS => {
  const { callout: baseTheme } = useTheme();

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return [
    {
      // color: theme.fg,
      // backgroundColor: theme.bg,
      // border: `1px solid ${theme.border || theme.fg}`,
      // borderRadius: '10px',
      padding: '5px',
      position: 'relative',
    },
  ];
};

const pathStyles = ({ invalid }: ICallout): React.CSSProperties => {
  const { callout: baseTheme } = useTheme();

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return {
    fill: theme.bg,
    fillRule: 'evenodd',
    stroke: theme.border,
    strokeOpacity: 1,
    strokeWidth: '1px',
    strokeLinejoin: 'round',
    strokeLinecap: 'butt',
    fillOpacity: 1,
    strokeDasharray: 'none',
  };
};
