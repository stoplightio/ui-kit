import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Classes } from '../classes';
import { useScrollToHash } from './hooks';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends ScrollbarProps {
  autoHeight?: boolean;
  autoHideTimeout?: number;
  onUpdate?: (values: positionValues) => void;

  // can scroll to an anchor/id
  scrollTo?: string;
  // include shadows to indicate more scroll
  shadows?: boolean;

  forwardedRef?: any;
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = ({
  scrollTo,
  children,
  shadows = true,
  onUpdate,
  forwardedRef,
  ...scrollbarProps
}) => {
  // can scroll to an anchor/id
  useScrollToHash(scrollTo);

  // Used to add/remove box shadow styling as we scroll
  const divContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Used to set the value of the divContainerRef and forwardedRef
  const refSetter = React.useCallback(scrollbarsRef => {
    divContainerRef.current = scrollbarsRef ? scrollbarsRef.view : null;

    if (forwardedRef) {
      forwardedRef(scrollbarsRef ? scrollbarsRef.view : null);
    }
  }, []);

  const handleUpdate = React.useCallback(
    (values: positionValues) => {
      if (onUpdate) {
        onUpdate(values);
      }

      if (shadows && divContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

        divContainerRef.current.style.boxShadow = `rgba(221, 221, 221, ${shadowTopOpacity}) 0px 6px 6px -6px inset, rgba(221, 221, 221, ${shadowBottomOpacity}) 0px -6px 6px -6px inset`;
      }
    },
    [shadows, onUpdate]
  );

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={refSetter}
      onUpdate={handleUpdate}
      hideTracksWhenNotNeeded
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={300}
      renderView={({ style }) => (
        <div className={Classes.SCROLL_CONTAINER} style={{ ...style, marginBottom: 0, marginRight: 0 }} />
      )}
      renderTrackHorizontal={({ style }) => (
        <div
          style={{
            ...style,
            borderRadius: 3,
            right: 10,
            bottom: 2,
            left: 2,
          }}
        />
      )}
      renderThumbHorizontal={hThumbProps => <div {...hThumbProps} className="bg-darken-5 dark:bg-darken-8 rounded" />}
      renderTrackVertical={({ style }) => (
        <div
          style={{
            ...style,
            borderRadius: 3,
            bottom: 2,
            right: 2,
            top: 2,
          }}
        />
      )}
      renderThumbVertical={vThumbProps => <div {...vThumbProps} className="bg-darken-5 dark:bg-darken-8 rounded" />}
    >
      {children}
    </Scrollbars>
  );
};

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer };
