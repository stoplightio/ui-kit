import * as React from 'react';

import { Icon as BPIcon, IIconProps } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, Props as FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// TODO NOT SURE IF WE WANT TO SUPPORT BOTH

/**
 * FONT AWESOME ICON
 */
const FaIconLibrary = library;

interface IFaIconProps extends FontAwesomeIconProps {}
const FaIcon: React.FunctionComponent<IFaIconProps> = (props: IFaIconProps) => {
  return <FontAwesomeIcon {...props} />;
};

export { IFaIconProps, FaIcon, FaIconLibrary };

/**
 * BLUEPRINT ICON
 */

const Icon: React.FunctionComponent<IIconProps> = (props: IIconProps) => {
  return <BPIcon {...props} />;
};

export { Icon, IIconProps, IconNames };
