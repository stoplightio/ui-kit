import * as cn from 'classnames';
import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Classes } from '../';
import { useScrollToHash } from './hooks';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends ScrollbarProps {
  innerRef?: React.RefObject<Scrollbars>;

  autoHeight?: boolean;
  autoHideTimeout?: number;
  onUpdate?: (values: positionValues) => void;

  // can scroll to an anchor/id
  scrollTo?: string;
  // include shadows to indicate more scroll
  shadows?: boolean;
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = ({
  scrollTo,
  children,
  shadows = true,
  innerRef,
  style,
  onUpdate,
  ...scrollbarProps
}) => {
  // can scroll to an anchor/id
  useScrollToHash(scrollTo);

  const [state, setState] = React.useState({ shadowTop: 0, shadowBottom: 0 });

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

        setState({ shadowTop: shadowTopOpacity, shadowBottom: shadowBottomOpacity });
      }
    },
    [shadows, onUpdate]
  );

  return (
    <Scrollbars
      {...scrollbarProps}
      onUpdate={handleUpdate}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={300}
      renderView={({ style }) => {
        return (
          <div
            className={cn(
              Classes.SCROLL_CONTAINER,
              state.shadowTop && 'shadow-top',
              state.shadowBottom && 'shadow-bottom'
            )}
            style={{
              ...style,
              margin: '-15px', // offset the native scroll bars
              padding: '15px', // reset negaitve margins
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
