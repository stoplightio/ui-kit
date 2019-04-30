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

const ScrollContainer: React.FunctionComponent<IScrollContainer> = props => {
  // can scroll to an anchor/id
  useScrollToHash(props.scrollTo);
  // we want to show the bottom shadow when the component is loaded
  const [showShadowOnMount, setShowShadowOnMount] = React.useState(props.shadows);

  const { scrollTo, children, shadows = true, innerRef, onScroll, style, ...scrollbarProps } = props;
  const scrollbars = innerRef || React.useRef<Scrollbars>(null);
  const scrollPosition = (scrollbars.current && scrollbars.current.getValues()) || ({} as positionValues);
  const { scrollTop, scrollHeight, clientHeight } = scrollPosition;

  const shadowTop = shadows && scrollTop;
  const shadowBottom = showShadowOnMount || (shadows && scrollHeight && scrollHeight - scrollTop !== clientHeight);

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={scrollbars}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={300}
      onScroll={(e: any) => {
        if (onScroll) onScroll(e);

        // after intial scroll the ref will be set and we can use that to calculate shadows
        setShowShadowOnMount(false);
      }}
      // overide to offset the native scroll bars
      renderView={({ style }: any) => {
        return (
          <div
            className={cn(Classes.SCROLL_CONTAINER, shadowTop && 'shadow-top', shadowBottom && 'shadow-bottom')}
            style={{
              ...style,
              marginRight: '-15px',
              marginBottom: '-15px',
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
