import * as React from 'react';

import { useWindowResize } from '../hooks/useWindowResize';
import { useTheme } from '../theme';
import { PopupContent } from './PopupContent';
import { IPopupDefaultProps, IPopupProps } from './types';
import { calculateStyles, getDefaultStyle, getInitialStyle } from './utils';

export { IPopupProps, IPopupDefaultProps };

export interface IPopup extends IPopupProps {}

const Popup: React.FunctionComponent<IPopup> = props => {
  const { hideDelay, width, offset, posX, posY, show = false } = props;

  const theme = useTheme();

  const controlled = 'show' in props;
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = React.useState<boolean>(false);
  const isVisible = controlled ? show : visibility;
  const lastResizeTimestamp = useWindowResize();
  const [style, setStyle] = React.useState<React.CSSProperties>(getInitialStyle(props));
  let isOverTrigger: boolean = false;
  let isOverContent: boolean = false;
  let willHide: NodeJS.Timer | number | null = null;

  const repaint = React.useCallback(() => {
    if (isVisible) {
      setStyle({
        ...getDefaultStyle(props),
        ...calculateStyles(triggerRef, contentRef, props),
      });
    }
  }, [triggerRef.current, contentRef.current, width, offset, posX, posY, isVisible]);

  if (typeof window !== 'undefined') {
    React.useEffect(repaint, [lastResizeTimestamp, contentRef.current]);
  }

  const showPopup = React.useCallback(() => {
    if (controlled) return;
    if (willHide !== null) {
      clearTimeout(willHide as number);
      willHide = null;
    }

    setVisibility(true);
  }, [willHide, isVisible, controlled]);

  const hidePopup = React.useCallback(() => {
    if (willHide !== null || controlled) {
      return;
    }

    willHide = setTimeout(() => {
      isOverTrigger = false;
      isOverContent = false;
      setVisibility(false);
    }, hideDelay);
  }, [willHide, isVisible, controlled]);

  const { renderTrigger, renderContent } = props;

  const funcs = {
    isVisible,
    showPopup,
    hidePopup,
  };

  const handleMouseEnter = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    ({ target }) => {
      if (target === triggerRef.current) {
        isOverTrigger = true;
      } else if (target === contentRef.current) {
        isOverContent = true;
      }

      showPopup();
    },
    [triggerRef.current, contentRef.current, isVisible]
  );

  const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    ({ target }) => {
      if (target === triggerRef.current) {
        isOverTrigger = false;
      } else if (target === contentRef.current) {
        isOverContent = false;
      }

      if (isVisible && !isOverTrigger && !isOverContent) {
        hidePopup();
      }
    },
    [triggerRef.current, contentRef.current, isVisible]
  );

  return (
    <>
      {React.cloneElement(
        renderTrigger({
          ...funcs,
          isOver: isOverTrigger,
        }),
        {
          ref: triggerRef,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }
      )}
      {isVisible && (
        <PopupContent
          ref={contentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={style}
          repaint={repaint}
        >
          {renderContent({
            ...funcs,
            isOver: isOverContent,
            theme,
          })}
        </PopupContent>
      )}
    </>
  );
};

Popup.displayName = 'Popup';

Popup.defaultProps = {
  padding: 15,
  hideDelay: 200,
  posX: 'left',
  posY: 'top',
} as IPopupDefaultProps;

export { Popup };
