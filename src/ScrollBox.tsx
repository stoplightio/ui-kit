import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { jsx } from '@emotion/core';
import { Box, IBox } from './Box';
import { useScrollToHash } from './hooks/useScrollToHash';
import { useTheme } from './theme';
import { getScrollTransform, getThumbDimension, horizontalTrackStyle, verticalTrackStyle } from './utils/scroll';

const ScrollbarThumb = React.forwardRef<HTMLDivElement, IScrollBoxThumb>((props, innerRef) => {
  const { isScrolling, ...rest } = props;
  const css = scrollbarStyles({ isScrolling });

  return jsx(Box, {
    ...rest,
    innerRef,
    as: 'div',
    css,
  });
});

interface IScrollBoxThumbProps {
  isScrolling: boolean;
}

interface IScrollBoxThumb extends IScrollBoxThumbProps, IBox<HTMLDivElement> {}

const scrollbarStyles = ({ isScrolling }: IScrollBoxThumbProps) => {
  const theme = useTheme();

  return {
    borderRadius: '5px',
    cursor: 'grab',
    backgroundColor: theme.scrollbar.bg,
    opacity: isScrolling ? 1 : 0,
    transition: 'opacity .1s',
  };
};

export const ScrollBox: React.FunctionComponent<IScrollBox> = (props: IScrollBox) => {
  // pull out scrollTo so they are not in scrollbarProps (don't want them spread onto <Scrollbars /> component)
  const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 500, innerRef, ...scrollbarProps } = props;

  const [isScrolling, setIsScrolling] = React.useState<null | number | NodeJS.Timer>(null);

  useScrollToHash(scrollTo);

  const scrollbars = innerRef || React.useRef<Scrollbars>(null);
  const current = scrollbars.current;
  const values = (current && current.getValues()) || ({} as positionValues);
  const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = values;

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
        /* todo: unwrap, and try to pass ref in a way Scrollbars receives it */
        <div>
          <ScrollbarThumb
            isScrolling={isScrolling !== null}
            height="6px"
            width={thumbHorizontal}
            transform={`translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`}
          />
        </div>
      )}
      renderTrackVertical={() => {
        return <div style={verticalTrackStyle()} />;
      }}
      renderThumbVertical={() => (
        /* todo: unwrap, and try to pass ref in a way Scrollbars receives it */
        <div>
          <ScrollbarThumb
            isScrolling={isScrolling !== null}
            height={thumbVertical}
            width="6px"
            transform={`translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)`}
          />
        </div>
      )}
    >
      {children}
    </Scrollbars>
  );
};

export interface IScrollBox extends IScrollBoxProps, ScrollbarProps {}

export interface IScrollBoxProps {
  innerRef?: React.RefObject<Scrollbars>;

  autoHeight?: boolean;
  autoHideTimeout?: number;

  // can scroll to an anchor/id
  scrollTo?: string;

  onUpdate?: (values: positionValues) => void;
}

export { Scrollbars as IScrollbars };
