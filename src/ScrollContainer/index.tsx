import { Omit } from '@stoplight/types';
import * as cn from 'classnames';
import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Classes } from '../';
import { useScrollToHash } from './hooks';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends Omit<ScrollbarProps, 'ref'> {
  ref?: (ref: React.RefObject<Scrollbars> | null) => void;
  autoHeight?: boolean;
  autoHideTimeout?: number;
  onUpdate?: (values: positionValues) => void;

  // can scroll to an anchor/id
  scrollTo?: string;
  // include shadows to indicate more scroll
  shadows?: boolean;
}

const ScrollContainer = React.forwardRef<HTMLDivElement, IScrollContainer>((props, ref) => {
  const { scrollTo, children, shadows = true, onScroll, ...scrollbarProps } = props;

  // can scroll to an anchor/id
  useScrollToHash(props.scrollTo);

  const [scrollbars, setScrollbars] = React.useState<Scrollbars | null>(null);
  const [shadowTop, setShadowTop] = React.useState<boolean | number>(false);
  const [shadowBottom, setShadowBottom] = React.useState<boolean | number>(shadows);

  const getRef = React.useCallback(scrollbarsRef => {
    setScrollbars(scrollbarsRef);
    if (typeof ref === 'function') return ref(scrollbarsRef || null);
  }, []);

  return (
    <Scrollbars
      {...scrollbarProps}
      ref={getRef}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={300}
      onScroll={(e: any) => {
        if (onScroll) onScroll(e);

        if (shadows) {
          const scrollPosition = (scrollbars && scrollbars.getValues()) || ({} as positionValues);
          const { scrollTop, scrollHeight, clientHeight } = scrollPosition;

          setShadowTop(!!scrollTop);
          setShadowBottom(scrollHeight && scrollHeight - scrollTop !== clientHeight);
        }
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
});

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer, Scrollbars };
