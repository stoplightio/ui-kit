import * as React from 'react';
// @ts-ignore
import { positionValues, Scrollbars } from 'react-custom-scrollbars';

import { Box, IBoxProps } from './Box';
import { useScrollToHash } from './hooks/useScrollToHash';
import { getScrollTransform, getThumbDimension, horizontalTrackStyle, verticalTrackStyle } from './utils/scroll';

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

  useScrollToHash(scrollTo);

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
        return <div style={horizontalTrackStyle()} />;
      }}
      renderThumbHorizontal={({ style }: any) => {
        return (
          <Box
            radius="full"
            cursor="grab"
            bg="scrollbar.bg"
            opacity={isScrolling ? 1 : 0}
            height="6px"
            width={thumbHorizontal}
            css={{
              transition: 'opacity .1s',
              transform: `translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`,
            }}
          />
        );
      }}
      renderTrackVertical={() => {
        return <div style={verticalTrackStyle()} />;
      }}
      renderThumbVertical={({ style }: any) => {
        return (
          <Box
            radius="full"
            cursor="grab"
            bg="scrollbar.bg"
            opacity={isScrolling ? 1 : 0}
            height={thumbVertical}
            width="6px"
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
