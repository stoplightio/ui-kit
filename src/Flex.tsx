/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import * as ss from 'styled-system';

import { Box, IBox } from './Box';

export const Flex: FunctionComponent<IFlex> = props => {
  const { as, flexBasis, flexDirection, flexWrap, alignItems, justifyContent, ...rest } = props;

  const css = [
    ss.flexBasis({ flexBasis }),
    ss.flexDirection({ flexDirection }),
    ss.flexWrap({ flexWrap }),
    ss.alignItems({ alignItems }),
    ss.justifyContent({ justifyContent }),
    ...flexStyles(),
  ];

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface IFlex
  extends IBox,
    ss.FlexBasisProps,
    ss.FlexDirectionProps,
    ss.FlexWrapProps,
    ss.AlignItemsProps,
    ss.JustifyContentProps {}

export const flexStyles = () => {
  return [
    {
      display: 'flex',
    },
  ];
};
