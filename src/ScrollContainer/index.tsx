import * as React from 'react';
import { Scrollbar, ScrollbarProps } from 'react-scrollbars-custom';

import compact = require('lodash/compact');
import min = require('lodash/min');

import { Classes } from '../classes';

/**
 * SCROLL CONTAINER
 */
interface IScrollContainer extends ScrollbarProps {
  maxHeight?: number;
  shadows?: boolean;
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = ({
  children,
  shadows = true,
  maxHeight,
  ...props
}) => {
  const [height, setHeight] = React.useState<number | null>(null);
  const [dragEndTimeout, setDragEndTimeout] = React.useState<any>(null);

  const scrollbar = React.useRef<any | null>(null);

  // dynamically grow or shrink content from prop, children, or parent
  React.useEffect(() => {
    if (!scrollbar.current) return;

    const holderElement = scrollbar.current.holderElement;
    const parentElement = holderElement.parentElement || {};
    const contentElement = scrollbar.current.contentElement;
    const childElement = contentElement.firstElementChild || {};

    const height = min(compact([parentElement.clientHeight, childElement.clientHeight, maxHeight]));

    holderElement.style.height = `${height}px`;

    // need to store height in state so the component rerenders
    setHeight(height);
  }, [height]);

  const handleDragEnd = React.useCallback(() => {
    setDragEndTimeout(window.setTimeout(hideTracks, 500));
  }, [dragEndTimeout]);

  const showTracks = React.useCallback(() => {
    if (!scrollbar.current) return;

    scrollbar.current.trackXElement.style.opacity = 1;
    scrollbar.current.trackYElement.style.opacity = 1;

    if (!dragEndTimeout) return;

    window.clearTimeout(dragEndTimeout);
    setDragEndTimeout(null);
  }, [scrollbar, dragEndTimeout]);

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

    if (!dragEndTimeout) return;

    window.clearTimeout(dragEndTimeout);
    setDragEndTimeout(null);
  }, [scrollbar, dragEndTimeout]);

  const updateShadows = React.useCallback(
    (scrollValues: any) => {
      if (!scrollbar.current || !shadows) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollValues;
      const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
      const bottomScrollTop = scrollHeight - clientHeight;
      const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

      scrollbar.current.wrapperElement.style.boxShadow = `inset 0 6px 6px -8px rgba(0, 0, 0, ${shadowTopOpacity}), inset 0 -6px 6px -8px rgba(0, 0, 0, ${shadowBottomOpacity})`;
    },
    [scrollbar, shadows]
  );

  // wrap in a container div to auto adust the height
  return (
    <Scrollbar
      {...props}
      wrapperProps={{
        className: Classes.SCROLL_CONTAINER,
        style: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden' },
      }}
      trackYProps={{
        onMouseOver: showTracks,
        onMouseOut: hideTracks,
        style: {
          opacity: 0,
          cursor: 'pointer',
          background: 'inherit',
          transition: 'opacity 0.2s',
          width: 8,
          marginRight: 2,
        },
      }}
      trackXProps={{
        onMouseOver: showTracks,
        onMouseOut: hideTracks,
        style: {
          opacity: 0,
          cursor: 'pointer',
          background: 'inherit',
          transition: 'opacity 0.2s',
          height: 8,
          marginBottom: 2,
        },
      }}
      thumbXProps={{ onDragEnd: handleDragEnd, className: 'bg-darken-5 dark:bg-darken-8 rounded' }}
      thumbYProps={{ onDragEnd: handleDragEnd, className: 'bg-darken-5 dark:bg-darken-8 rounded' }}
      ref={scrollbar}
      onScrollStart={showTracks}
      onScrollStop={hideTracks}
      onUpdate={updateShadows}
      scrollDetectionThreshold={500}
    >
      {children}
    </Scrollbar>
  );
};

ScrollContainer.displayName = 'ScrollContainer';

/**
 * EXPORTS
 */
export { IScrollContainer, ScrollContainer };
