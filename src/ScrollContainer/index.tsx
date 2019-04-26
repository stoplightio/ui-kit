import * as cn from 'classnames';
import * as React from 'react';
import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

import { Classes } from '../';
import { useScrollToHash } from './hooks';
import { getScrollTransform, getThumbDimension } from './utils';

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
}

const ScrollContainer: React.FunctionComponent<IScrollContainer> = props => {
  // pull out scrollTo so they are not in scrollbarProps (don't want them spread onto <Scrollbars /> component)
  const { scrollTo, children, onUpdate, autoHideTimeout = 500, innerRef, style, ...scrollbarProps } = props;

  const [isScrolling, setIsScrolling] = React.useState<null | number | NodeJS.Timer>(null);
  useScrollToHash(scrollTo);

  const scrollbars = innerRef || React.useRef<Scrollbars>(null);
  const position = (scrollbars.current && scrollbars.current.getValues()) || ({} as positionValues);
  const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = position;

  const thumbHorizontal = getThumbDimension({ scroll: scrollWidth, client: clientWidth }) || 0;
  const thumbVertical = getThumbDimension({ scroll: scrollHeight, client: clientHeight }) || 0;

  return (
    <Scrollbars
      {...scrollbarProps}
      style={style}
      ref={scrollbars}
      autoHideTimeout={autoHideTimeout}
      onUpdate={onUpdate}
      onScroll={(e: any) => {
        if (isScrolling !== null) {
          clearTimeout(isScrolling as number);
        }

        setIsScrolling(
          setTimeout(() => {
            setIsScrolling(null);
          }, autoHideTimeout)
        );
      }}
      renderView={({ style }: any) => {
        // overide to offset the native scroll bars
        return (
          <div
            style={{
              ...style,
              marginRight: '-15px',
              marginBottom: '-15px',
            }}
          />
        );
      }}
      // Custom component overrides
      renderTrackHorizontal={hTrackProps => <div {...hTrackProps} className={cn(Classes.SCROLL_TRACK, 'horizontal')} />}
      renderThumbHorizontal={({ ref: hThumbRef, style: hThumbStyle = {}, ...hThumbRest }) => (
        <div
          {...hThumbRest}
          ref={hThumbRef}
          className={cn(Classes.SCROLL_THUMB, !isScrolling && 'static')}
          style={{
            ...hThumbStyle,
            height: '6px',
            width: thumbHorizontal,
            transform: `translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`,
          }}
        />
      )}
      renderTrackVertical={vTrackProps => <div {...vTrackProps} className={cn(Classes.SCROLL_TRACK, 'vertical')} />}
      renderThumbVertical={({ ref: vThumbRef, style: vThumbStyle = {}, ...vThumbRest }) => (
        <div
          {...vThumbRest}
          ref={vThumbRef}
          className={cn(Classes.SCROLL_THUMB, !isScrolling && 'static')}
          style={{
            ...vThumbStyle,
            height: thumbVertical,
            width: '6px',
            transform: `translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)`,
          }}
        />
      )}
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
