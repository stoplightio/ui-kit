import { IPopoverProps as BPTooltipProps, Popover as BPTooltip } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TOOLTIP
 */
interface ITooltipProps extends BPTooltipProps {}
const Tooltip: React.FunctionComponent<ITooltipProps> = props => {
  return <BPTooltip {...props} />;
};

/**
 * EXPORTS
 */
export { ITooltipProps, Tooltip };
