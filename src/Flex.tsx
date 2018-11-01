import { Box, IBoxProps } from './Box';
import { alignItems, flexDirection, flexWrap, justifyContent, styled } from './utils';

export interface IFlexProps extends IBoxProps {
  items?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit'; // alignItems
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit'; // justifyContent
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'inherit'; // flexDirection
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit'; // flexWrap
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
