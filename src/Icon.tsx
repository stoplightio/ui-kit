/* @jsx jsx */

import { jsx } from '@emotion/core';
import {
  FaSymbol,
  FlipProp,
  IconProp,
  library,
  PullProp,
  RotateProp,
  SizeProp,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export const IconLibrary = library;

export const Icon: FunctionComponent<IIcon> = props => {
  return jsx(Box, {
    backgroundColor: 'transparent',
    ...props,
    as: FontAwesomeIcon as FunctionComponent,
  });
};

export interface IIcon extends IIconProps, IBox<HTMLOrSVGElement> {}

export interface IIconProps {
  icon: IconProp;
  mask?: IconProp;
  spin?: boolean;
  pulse?: boolean;
  fixedWidth?: boolean;
  inverse?: boolean;
  listItem?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotation?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
}
