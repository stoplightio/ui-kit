import { alignItems, flexDirection, flexWrap, justifyContent } from '../utils';

import { styled } from '../utils';
import { Box, IBoxProps } from './Box';

export interface IFlexProps extends IBoxProps {
  items?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit'; // alignItems
  justify?:  // justifyContent
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
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
