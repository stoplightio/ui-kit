import replace = require('lodash/replace');
import { CSSProperties } from 'react';

export const getScrollTransform = (
  client: number = 0,
  scroll: number = 0,
  currentLocation: number = 0,
  thumb: number = 0
) => {
  const trackSize = client - 28;
  return (currentLocation / (scroll - client)) * (trackSize - thumb);
};

export const getThumbDimension = ({ scroll = 0, client = 0 }: { scroll?: number; client?: number }) => {
  if (scroll < client) return 0;

  const track = client - 28;
  const height = Math.ceil((client / scroll) * track);
  return Math.max(height, 30);
};

export const horizontalTrackStyle = (style?: object): CSSProperties => ({
  background: 'transparent',
  position: 'absolute',
  cursor: 'pointer',
  right: 10,
  bottom: 2,
  left: 2,
  ...style,
});

export const verticalTrackStyle = (style?: object): CSSProperties => ({
  background: 'transparent',
  position: 'absolute',
  cursor: 'pointer',
  top: 2,
  right: 2,
  bottom: 10,
  ...style,
});

export const scrollToHash = (hash?: string) => {
  const element = document.getElementById(replace(hash || window.location.hash, '#', ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
};
