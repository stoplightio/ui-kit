import * as React from 'react';

import { Icon as BPIcon, IIconProps as BPIconProps } from '@blueprintjs/core';
import { IconName, IconNames } from '@blueprintjs/icons';
import { FontAwesomeIcon, Props as FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// TODO NOT SURE IF WE WANT TO SUPPORT BOTH

/**
 * FONT AWESOME ICON
 */
interface IFaIconProps extends FontAwesomeIconProps {}

const FaIcon: React.FunctionComponent<IFaIconProps> = (props: IFaIconProps) => {
  return <FontAwesomeIcon {...props} />;
};

/**
 * BLUEPRINT ICON
 */
interface IIconProps extends BPIconProps {}

const Icon: React.FunctionComponent<IIconProps> = (props: IIconProps) => {
  return <BPIcon {...props} />;
};

/**
 * EXPORTS
 */
export { Icon, IconNames, IconName, IIconProps, IFaIconProps, FaIcon };
