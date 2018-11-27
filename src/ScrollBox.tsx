import { replace } from 'lodash';
import * as React from 'react';
// @ts-ignore
import { positionValues, Scrollbars } from 'react-custom-scrollbars';

import { Box, IBoxProps } from './Box';

export interface IScrollBoxRef {
  scrollTop: (top?: number) => void;
  scrollLeft: (left?: number) => void;

  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollToLeft: () => void;
  scrollToRight: () => void;

  getScrollLeft: () => number;
  getScrollTop: () => number;
  getScrollWidth: () => number;
  getScrollHeight: () => number;

  getClientWidth: () => number;
  getClientHeight: () => number;

  getThumbVerticalHeight: () => number;
  getThumbHorizontalWidth: () => number;

  getValues: () => any;
}

export interface IScrollBox extends IBoxProps {
  innerRef?: React.RefObject<IScrollBoxRef>;

  autoHeight?: boolean;
  autoHideTimeout?: number;

  // can scroll to an anchor/id
  scrollTo?: string;

  // if use are using this as a list scroller children should be an array
  children?: any;

  onUpdate?: (values: positionValues) => void;
}

export const ScrollBox = (props: IScrollBox) => {
  // pull out scrollTo so they are not in scrollbarProps (don't want them spred onto <Scrollbars /> component)
  const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 500, innerRef, ...scrollbarProps } = props;

  const [isScrolling, setisScrolling] = React.useState(false);

  useScrollTo(scrollTo);

  const scrollbars = innerRef || React.useRef<IScrollBoxRef>(null);
  const current = scrollbars.current as IScrollBoxRef;
  const values = (current && current.getValues()) || {};
  const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = values;

  const thumbHorizontal = getThumbDimension({ scroll: scrollWidth, client: clientWidth }) || 0;
  const thumbVertical = getThumbDimension({ scroll: scrollHeight, client: clientHeight }) || 0;

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={innerRef || scrollbars}
      autoHideTimeout={autoHideTimeout}
      autoHeight={autoHeight}
      onUpdate={onUpdate}
      onScroll={(e: any) => {
        if (isScrolling) {
          // @ts-ignore
          clearTimeout(isScrolling);
        }

        setisScrolling(
          // @ts-ignore
          setTimeout(() => {
            setisScrolling(false);
          }, autoHideTimeout)
        );
      }}
      renderView={({ style }: any) => {
        // overide to offset the native scroll bars
        return (
          <div
            style={{
              ...style,
              marginRight: '-15px',
              marginBottom: '-15px',
            }}
          />
        );
      }}
      // Custom component overrides
      renderTrackHorizontal={({ style }: any) => {
        return (
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              cursor: 'pointer',
              right: 10,
              bottom: 2,
              left: 2,
            }}
          />
        );
      }}
      renderThumbHorizontal={({ style }: any) => {
        return (
          <Box
            radius="full"
            // @ts-ignore
            cursor="grab"
            height="6px"
            bg="scrollbar.bg"
            width={thumbHorizontal}
            opacity={isScrolling ? 1 : 0}
            css={{
              transition: 'opacity .1s',
              transform: `translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`,
            }}
          />
        );
      }}
      renderTrackVertical={() => {
        return (
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              cursor: 'pointer',
              top: 2,
              right: 2,
              bottom: 10,
            }}
          />
        );
      }}
      renderThumbVertical={({ style }: any) => {
        return (
          <Box
            radius="full"
            width="6px"
            cursor="grab"
            bg="scrollbar.bg"
            height={thumbVertical}
            opacity={isScrolling ? 1 : 0}
            css={{
              transition: 'opacity .1s',
              transform: `translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)`,
            }}
          />
        );
      }}
    >
      {children}
    </Scrollbars>
  );
};

const useScrollTo = (elementId?: string) => {
  const scrollToHash = (hash?: string) => {
    const element = document.getElementById(replace(hash || window.location.hash, '#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  const targetScrollTo = elementId || (typeof window !== 'undefined' ? window.location.hash : null);
  React.useEffect(
    () => {
      if (targetScrollTo) {
        scrollToHash(targetScrollTo);
      }
    },
    [targetScrollTo]
  );
};

export const getScrollTransform = (client: number, scroll: number, currentLocation: number, thumb: number) => {
  const trackSize = client - 28;
  return (currentLocation / (scroll - client)) * (trackSize - thumb);
};

export const getThumbDimension = ({ scroll, client }: { scroll: number; client: number }) => {
  if (scroll < client) return 0;

  const track = client - 28;
  const height = Math.ceil((client / scroll) * track);
  return Math.max(height, 30);
};
