import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Classes } from '../classes';
import { useCalculateHeight, useSetRef, useUpdateShadows } from './hooks';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends ScrollbarProps {
  autoHideTimeout?: number;
  onUpdate?: (values: positionValues) => void;
  forwardedRef?: any;

  // include shadows to indicate more scroll
  shadows?: boolean;
  // include to set max height, else grows to children height
  maxHeight?: number;
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = ({
  children,
  shadows = true,
  maxHeight,
  onUpdate,
  forwardedRef,
  style = {},
  ...scrollbarProps
}) => {
  // Used to add/remove box shadow styling as we scroll
  const divContainerRef = React.useRef<HTMLDivElement | null>(null);
  // used to calculate height if parent div has no height
  const childrenRef = React.useRef<HTMLDivElement | null>(null);

  // use to to dynamically calulate height based on the minimum of either the children content, maxHeight prop or parent div
  const [height, setHeight] = React.useState(0);
  useCalculateHeight(setHeight, divContainerRef, childrenRef, maxHeight);

  // Used to set the value of the divContainerRef and forwardedRef
  const ref = useSetRef(divContainerRef, forwardedRef);
  // used to set and update shadows on container div
  const handleUpdate = useUpdateShadows(divContainerRef, onUpdate, shadows);

  return (
    <Scrollbars
      {...scrollbarProps}
      style={{ ...style, height }}
      ref={ref}
      onUpdate={handleUpdate}
      hideTracksWhenNotNeeded
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={300}
      renderView={({ style }) => <div className={Classes.SCROLL_CONTAINER} style={style} />}
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
      <div ref={childrenRef}>{children}</div>
    </Scrollbars>
  );
};

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer };
