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
export type ScrollbarRefInstance = HTMLDivElement | Scrollbar | null;
export type ScrollbarRef = (instance: ScrollbarRefInstance) => void;

interface IScrollContainer extends Omit<ScrollbarProps, 'ref'> {
  shadows?: boolean;
  autosize?: boolean;
}

const ScrollContainer = React.forwardRef<ScrollbarRefInstance, IScrollContainer>(
  ({ id, children, shadows = true, autosize = true, ...props }, scrollbarRef) => {
    const scrollbar = React.useRef<any>(null);
    const scrollbarCallback = React.useCallback<ScrollbarRef>(
      ref => {
        scrollbar.current = ref;
        if (typeof scrollbarRef === 'function') {
          scrollbarRef(ref);
        }
      },
      [scrollbarRef],
    );

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
        const shadowTopOpacity = (1 / 20) * scrollTop;
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop));
        const darkMode = window.document.getElementsByClassName('bp3-dark').length > 0;
        scrollbar.current.wrapperElement.style.boxShadow = `rgba(${
          darkMode ? `44, 44, 44` : `221, 221, 221`
        }, ${shadowTopOpacity}) 0px 7px 8px -7px inset, rgba(${
          darkMode ? `44, 44, 44` : `221, 221, 221`
        }, ${shadowBottomOpacity}) 0px -7px 8px -7px inset`;
      },
      [scrollbar, shadows],
    );

    const thumbRenderer = React.useCallback(
      (props: Pick<ScrollbarThumbProps, Exclude<keyof ScrollbarThumbProps, 'axis'>>) => {
        const { elementRef, style, className } = props;
        const styles = omit(style, ['background', 'borderRadius']);
        return (
          <div
            className={cn(
              className,
              'bg-darken-4 hover:bg-darken-6 active:bg-darken-7 dark:bg-lighten-4 dark-hover:bg-lighten-5 dark-active:bg-lighten-6',
            )}
            style={styles}
            ref={elementRef}
          />
        );
      },
      [],
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
            width: 6,
            marginRight: 0,
            borderRadius: 0,
            top: 0,
            bottom: 0,
            height: '100%',
          },
        }}
        trackXProps={{
          style: {
            opacity: 0,
            cursor: 'pointer',
            background: 'inherit',
            height: 6,
            marginBottom: 0,
            borderRadius: 0,
            left: 0,
            right: 0,
            width: '100%',
          },
        }}
        thumbXProps={{
          renderer: thumbRenderer,
        }}
        thumbYProps={{
          renderer: thumbRenderer,
        }}
        ref={scrollbarCallback}
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
  },
);

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer };
