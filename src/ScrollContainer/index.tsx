import * as React from 'react';
import { Scrollbar, ScrollbarProps } from 'react-scrollbars-custom';

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
  const [dragEndTimeout, setDragEndTimeout] = React.useState<number | NodeJS.Timer | null>(null);

  const scrollbar = React.useRef<any>(null);

  const handleDragEnd = React.useCallback(() => {
    setDragEndTimeout(window.setTimeout(hideTracks, 500));
  }, [dragEndTimeout]);

  const showTracks = React.useCallback(() => {
    if (!scrollbar.current) return;

    scrollbar.current.trackXElement.style.opacity = 1;
    scrollbar.current.trackYElement.style.opacity = 1;

    if (!dragEndTimeout) return;

    window.clearTimeout(dragEndTimeout as number);
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

    window.clearTimeout(dragEndTimeout as number);
    setDragEndTimeout(null);
  }, [scrollbar, dragEndTimeout]);

  const updateShadows = React.useCallback(
    (scrollValues: any) => {
      if (!scrollbar.current || !shadows) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollValues;
      const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
      const bottomScrollTop = scrollHeight - clientHeight;
      const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

      scrollbar.current.wrapperElement.style.boxShadow = `rgba(221, 221, 221, ${shadowTopOpacity}) 0px 6px 6px -6px inset, rgba(221, 221, 221, ${shadowBottomOpacity}) 0px -6px 6px -6px inset`;
    },
    [scrollbar, shadows]
  );

  const ScrollElem = (
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
          width: 7,
          marginRight: 4,
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
          height: 7,
          marginBottom: 4,
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
