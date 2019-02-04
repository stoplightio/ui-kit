/* @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, FunctionComponent, RefObject, useRef, useState } from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Box, IBox } from './Box';
import { useScrollToHash } from './hooks/useScrollToHash';
import { useTheme } from './theme';
import { getScrollTransform, getThumbDimension, horizontalTrackStyle, verticalTrackStyle } from './utils/scroll';

/**
 * THUMB
 * this is the actual bar
 */
interface IScrollBoxThumb extends IBox<HTMLDivElement> {
  isScrolling: boolean;
}

const ScrollbarThumb = forwardRef<HTMLDivElement, IScrollBoxThumb>((props, ref) => {
  const { isScrolling, ...rest } = props;
  const css = scrollbarStyles({ isScrolling });

  return jsx(Box, {
    ...rest,
    ref,
    as: 'div',
    css,
  });
});

const scrollbarStyles = ({ isScrolling }: IScrollBoxThumb) => {
  const { scrollbar } = useTheme();

  return {
    backgroundColor: scrollbar.bg,

    borderRadius: '5px',
    cursor: 'grab',
    opacity: isScrolling ? 1 : 0,
    transition: 'opacity .1s',
  };
};

/**
 * SCROLLBOX
 */

export interface IScrollBox extends ScrollbarProps {
  innerRef?: RefObject<Scrollbars>;

  autoHeight?: boolean;
  autoHideTimeout?: number;
  onUpdate?: (values: positionValues) => void;

  // can scroll to an anchor/id
  scrollTo?: string;
}

export const ScrollBox: FunctionComponent<IScrollBox> = (props: IScrollBox) => {
  // pull out scrollTo so they are not in scrollbarProps (don't want them spread onto <Scrollbars /> component)
  const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 500, innerRef, ...scrollbarProps } = props;

  const [isScrolling, setIsScrolling] = useState<null | number | NodeJS.Timer>(null);
  useScrollToHash(scrollTo);

  const scrollbars = innerRef || useRef<Scrollbars>(null);
  const position = (scrollbars.current && scrollbars.current.getValues()) || ({} as positionValues);
  const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = position;

  const thumbHorizontal = getThumbDimension({ scroll: scrollWidth, client: clientWidth }) || 0;
  const thumbVertical = getThumbDimension({ scroll: scrollHeight, client: clientHeight }) || 0;

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={scrollbars}
      autoHideTimeout={autoHideTimeout}
      autoHeight={autoHeight}
      onUpdate={onUpdate}
      onScroll={(e: any) => {
        if (isScrolling !== null) {
          clearTimeout(isScrolling as number);
        }

        setIsScrolling(
          setTimeout(() => {
            setIsScrolling(null);
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
      renderTrackHorizontal={() => <div style={horizontalTrackStyle()} />}
      renderThumbHorizontal={() => (
        <ScrollbarThumb
          isScrolling={isScrolling !== null}
          height="6px"
          width={thumbHorizontal}
          transform={`translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`}
        />
      )}
      renderTrackVertical={() => <div style={verticalTrackStyle()} />}
      renderThumbVertical={() => (
        <ScrollbarThumb
          isScrolling={isScrolling !== null}
          height={thumbVertical}
          width="6px"
          transform={`translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)`}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export { Scrollbars as IScrollbars };
