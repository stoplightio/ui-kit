import { Card as BPCard, Elevation as CardElevation, ICardProps as BPCardProps } from '@blueprintjs/core';
import * as React from 'react';

interface ICard extends BPCardProps {}
const Card: React.FunctionComponent<ICard> = props => {
  return <BPCard {...props} />;
};

export { ICard, Card, CardElevation };
