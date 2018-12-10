/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import * as ss from 'styled-system';
import * as sl from './styles';

import { Box, IBox } from './Box';

export const Flex: FunctionComponent<IFlex> = props => {
  const { flexBasis, flexFlow, flexDirection, flexWrap, alignItems, justifyContent, ...rest } = props;

  const css = [
    ss.flexBasis({ flexBasis }),
    ss.flexDirection({ flexDirection }),
    ss.flexWrap({ flexWrap }),
    ss.alignItems({ alignItems }),
    ss.justifyContent({ justifyContent }),
    sl.flexFlow({ flexFlow }),
    ...flexStyles(),
  ];

  return jsx(Box, {
    ...rest,
    css,
  });
};

export interface IFlex<T extends HTMLElement = HTMLElement>
  extends IBox<T>,
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
