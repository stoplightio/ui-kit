import { Card as BPCard, Elevation as CardElevation, ICardProps as BPCardProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * CARD
 */
interface ICardProps extends BPCardProps {}

const Card: React.FunctionComponent<ICardProps> = props => {
  return <BPCard {...props} />;
};

/**
 * EXPORTS
 */
export { Card, CardElevation, ICardProps };
