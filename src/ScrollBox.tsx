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
  const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 100, innerRef, ...scrollbarProps } = props;

  useScrollTo(scrollTo);

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={innerRef}
      autoHideTimeout={autoHideTimeout}
      autoHeight={autoHeight}
      onUpdate={onUpdate}
      // Custom component overrides
      renderTrackHorizontal={() => (
        <div
          style={{
            background: 'transparent',
            position: 'absolute',
            bottom: 2,
            left: 2,
            right: 10,
            cursor: 'pointer',
          }}
        />
      )}
      renderThumbHorizontal={() => {
        return <Box radius="full" height="6px" bg="scrollbar.bg" cursor="grab" />;
      }}
      renderTrackVertical={() => (
        <div
          style={{
            background: 'transparent',
            position: 'absolute',
            right: 2,
            top: 2,
            bottom: 10,
            cursor: 'pointer',
          }}
        />
      )}
      renderThumbVertical={() => {
        return <Box radius="full" width="6px" bg="scrollbar.bg" cursor="grab" />;
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
