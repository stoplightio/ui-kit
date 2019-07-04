import cn from 'classnames';
import { omit } from 'lodash';
import * as React from 'react';
import { Scrollbar, ScrollbarProps } from 'react-scrollbars-custom';
import { ScrollbarThumbProps } from 'react-scrollbars-custom/dist/types/ScrollbarThumb';

import { Classes } from '../classes';
import { AutoSizer } from '../index';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends ScrollbarProps {
  shadows?: boolean;
  autosize?: boolean;
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = ({
  id,
  children,
  shadows = true,
  autosize = true,
  ...props
}) => {
  const scrollbar = React.useRef<any>(null);

  const showTracks = React.useCallback(() => {
    if (!scrollbar.current) return;

    scrollbar.current.trackXElement.style.opacity = 1;
    scrollbar.current.trackYElement.style.opacity = 1;
    scrollbar.current.trackXElement.style.transition = 'opacity 0s';
    scrollbar.current.trackYElement.style.transition = 'opacity 0s';
  }, [scrollbar]);

  const hideTracks = React.useCallback(() => {
    if (
      !scrollbar.current ||
      scrollbar.current.trackXElement.classList.contains('dragging') ||
      scrollbar.current.trackYElement.classList.contains('dragging')
    ) {
      return;
    }

    scrollbar.current.trackXElement.style.opacity = 0;
    scrollbar.current.trackYElement.style.opacity = 0;
    scrollbar.current.trackXElement.style.transition = 'opacity 0.8s';
    scrollbar.current.trackYElement.style.transition = 'opacity 0.8s';
  }, [scrollbar]);

  const updateShadows = React.useCallback(
    (scrollValues: any) => {
      if (!scrollbar.current || !shadows) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollValues;
      const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
      const bottomScrollTop = scrollHeight - clientHeight;
      const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

      scrollbar.current.wrapperElement.style.boxShadow = `rgba(221, 221, 221, ${shadowTopOpacity}) 0px 7px 8px -7px inset, rgba(221, 221, 221, ${shadowBottomOpacity}) 0px -7px 8px -7px inset`;
    },
    [scrollbar, shadows]
  );

  const thumbRenderer = React.useCallback(
    (props: Pick<ScrollbarThumbProps, Exclude<keyof ScrollbarThumbProps, 'axis'>>) => {
      const { elementRef, style, className } = props;
      const styles = omit(style, ['background', 'borderRadius']);
      return (
        <div
          className={cn(
            className,
            'bg-darken-5 hover:bg-darken-6 active:bg-darken-7 dark:bg-lighten-4 dark:bg-lighten-5:hover'
          )}
          style={styles}
          ref={elementRef}
        />
      );
    },
    []
  );

  const ScrollElem = (
    <Scrollbar
      {...props}
      wrapperProps={{
        className: Classes.SCROLL_CONTAINER,
        style: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' },
      }}
      trackYProps={{
        style: {
          opacity: 0,
          cursor: 'pointer',
          background: 'inherit',
          width: 7,
          marginRight: 4,
          borderRadius: 0,
        },
      }}
      trackXProps={{
        style: {
          opacity: 0,
          cursor: 'pointer',
          background: 'inherit',
          height: 7,
          marginBottom: 4,
          borderRadius: 0,
        },
      }}
      thumbXProps={{
        renderer: thumbRenderer,
      }}
      thumbYProps={{
        renderer: thumbRenderer,
      }}
      ref={scrollbar}
      onUpdate={updateShadows}
      scrollDetectionThreshold={500}
      onMouseOver={showTracks}
      onMouseOut={hideTracks}
    >
      {children}
    </Scrollbar>
  );

  if (autosize) {
    return <AutoSizer>{({ height, width }) => <div style={{ height, width }}>{ScrollElem}</div>}</AutoSizer>;
  }

  return ScrollElem;
};

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer };
