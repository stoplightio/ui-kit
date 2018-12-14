/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { colorMixin } from './theme/utils';

export interface IContainer extends IBox {}

export const Container: FunctionComponent<IContainer> = props => {
  const css = containerStyles();

  return jsx(Box, {
    ...props,
    css,
  });
};

export const containerStyles = () => {
  return [
    colorMixin('', 'container'),
    colorMixin('hover', 'container'),
    colorMixin('focus', 'container'),
    colorMixin('active', 'container'),
  ];
};
