import { CSSProperties } from 'react';
import { Box, IBoxProps } from './Box';
import { alignItems, flexDirection, flexWrap, justifyContent, styled } from './utils';

export interface IFlexProps extends IBoxProps {
  items?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
}

export const Flex = styled<IFlexProps, 'div'>(Box as any)(
  {
    // @ts-ignore
    display: 'flex',
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
);
