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

  const [shadowOpacity, setShadowOpactity] = React.useState({ top: 0, bottom: 0 });

  const handleUpdate = React.useCallback(
    (values: positionValues) => {
      if (onUpdate) {
        onUpdate(values);
      }

      if (shadows) {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

        if (shadowTopOpacity !== shadowOpacity.top || shadowBottomOpacity !== shadowOpacity.bottom) {
          setShadowOpactity({ top: shadowTopOpacity, bottom: shadowBottomOpacity });
        }
      }
    },
    [shadowOpacity, shadows, onUpdate]
  );

  const refSetter = React.useCallback(
    scrollbarsRef => {
      if (!forwardedRef) return;

      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view);
      } else {
        forwardedRef(null);
      }
    },
    [forwardedRef]
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
      renderView={({ style }) => {
        return (
          <div
            className={Classes.SCROLL_CONTAINER}
            style={{
              ...style,
              boxShadow: `inset 0 8px 8px -8px rgba(0, 0, 0, ${
                shadowOpacity.top
              }), inset 0 -8px 8px -8px rgba(0, 0, 0, ${shadowOpacity.bottom})`,
            }}
          />
        );
      }}
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
            bottom: 10,
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
