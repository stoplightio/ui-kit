import { IPopoverProps as BPPopoverProps, Popover as BPPopover } from '@blueprintjs/core';
import * as React from 'react';

/**
 * POPOVER
 */
interface IPopoverProps extends BPPopoverProps {}

const Popover: React.FunctionComponent<IPopoverProps> = props => {
  return <BPPopover {...props} />;
};

/**
 * EXPORTS
 */
export { IPopoverProps, Popover };
