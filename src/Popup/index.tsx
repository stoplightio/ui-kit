import * as React from 'react';

import { useWindowResize } from '../hooks/useWindowResize';
import { useTheme } from '../theme';
import { PopupContent } from './PopupContent';
import { IPopupDefaultProps, IPopupProps } from './types';
import { calculateStyles, getDefaultStyle } from './utils';

export { IPopupProps, IPopupDefaultProps };

export interface IPopup extends IPopupProps {}

export const Popup: React.FunctionComponent<IPopup> = props => {
  const { hideDelay, width, offset, posX, posY } = props;

  const theme = useTheme();

  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.createRef<HTMLDivElement>();
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  const lastResizeTimestamp = useWindowResize();
  let lastRepaintTimestamp = 0;
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  let isOverTrigger: boolean = false;
  let isOverContent: boolean = false;
  let willHide: NodeJS.Timer | number | null = null;

  const repaint = React.useCallback(
    () => {
      if (isVisible) {
        lastRepaintTimestamp = Date.now();
        setStyle({
          ...getDefaultStyle(props),
          ...calculateStyles(triggerRef, contentRef, props),
        });
      }
    },
    [width, offset, posX, posY, contentRef, lastRepaintTimestamp]
  );

  if (typeof window !== 'undefined') {
    React.useEffect(repaint, [lastResizeTimestamp]);
  }

  const showPopup = () => {
    if (willHide !== null) {
      clearTimeout(willHide as number);
      willHide = null;
    }

    setVisibility(true);
  };

  const hidePopup = () => {
    if (willHide !== null) {
      return;
    }

    willHide = setTimeout(() => {
      isOverTrigger = false;
      isOverContent = false;
      setVisibility(false);
    }, hideDelay);
  };

  const { renderTrigger, renderContent } = props;

  const funcs = {
    isVisible,
    showPopup,
    hidePopup,
  };

  const handleMouseEnter = ({ target }: React.SyntheticEvent<HTMLElement>) => {
    if (target === triggerRef.current) {
      isOverTrigger = true;
    } else if (target === contentRef.current) {
      isOverContent = true;
    }

    showPopup();
  };

  const handleMouseLeave = ({ target }: React.SyntheticEvent<HTMLElement>) => {
    if (target === triggerRef.current) {
      isOverTrigger = false;
    } else if (target === contentRef.current) {
      isOverContent = false;
    }

    if (isVisible && !isOverTrigger && !isOverContent) {
      hidePopup();
    }
  };

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

Popup.defaultProps = {
  padding: 15,
  hideDelay: 200,
  posX: 'left',
  posY: 'top',
} as IPopupDefaultProps;
