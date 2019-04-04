import { IPopoverProps as BPTooltipProps, Popover as BPTooltip } from '@blueprintjs/core';
import * as React from 'react';

interface ITooltipProps extends BPTooltipProps {}
const Tooltip: React.FunctionComponent<ITooltipProps> = props => {
  return <BPTooltip {...props} />;
};

export { ITooltipProps, Tooltip };
