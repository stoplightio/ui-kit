import * as React from 'react';

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
import { Box, IBox } from './Box';

export const IconLibrary = library;

export interface IIcon extends IBox<HTMLOrSVGElement> {
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

const Icon: React.FunctionComponent<IIcon> = React.forwardRef<HTMLOrSVGElement, IIcon>(function Icon(props, ref) {
  const { css, ...rest } = props;
  return <Box {...rest} as={FontAwesomeIcon} ref={ref} css={[iconStyles(), css]} />;
});

const iconStyles = () => [{ background: 'transparent' }];

export { Icon };
