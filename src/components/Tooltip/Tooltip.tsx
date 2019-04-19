import { ITooltipProps as BPTooltipProps, Tooltip as BPTooltip } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Tooltip
 */
interface ITooltipProps extends BPTooltipProps {}

const Tooltip: React.FunctionComponent<ITooltipProps> = props => {
  return <BPTooltip {...props} />;
};

/**
 * EXPORTS
 */
export { Tooltip, ITooltipProps };
