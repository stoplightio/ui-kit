import { Box, IBoxProps } from './Box';
import { ICSSProps } from './types';
import { alignItems, flexDirection, flexWrap, justifyContent, styled } from './utils';

export interface IFlexProps extends IBoxProps {
  items?: ICSSProps['flexAlignItems'];
  justify?: ICSSProps['flexJustifyContent'];
  direction?: ICSSProps['flexDirection'];
  wrap?: ICSSProps['flexWrap'];
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
