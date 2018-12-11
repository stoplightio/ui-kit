import { CSSProperties, ReactElement, ReactEventHandler, ReactNode } from 'react';
import { ITheme } from '../theme';

export type PopupTriggerRenderer = (
  props: {
    isVisible: boolean;
    isOver: boolean;
    showPopup: () => void;
    hidePopup: () => void;
  }
) => ReactElement<any>;

export type PopupContentRenderer = (
  props: {
    isVisible: boolean;
    isOver: boolean;
    showPopup: () => void;
    hidePopup: () => void;
    theme: ITheme;
  }
) => any;

export interface IPopupPositionOffset {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface IPopupPosition {
  width?: number; // force a width
  padding: number; // transparent space around the popup
  offset?: IPopupPositionOffset;
  posX: 'left' | 'center' | 'right';
  posY: 'top' | 'center' | 'bottom';
}

export interface IPopupProps extends IPopupPosition {
  hideDelay?: number; // how long popup will show for after user mouses out
  renderTrigger: PopupTriggerRenderer;
  renderContent: PopupContentRenderer;
}

export interface IPopupDefaultProps {
  padding: 15;
  hideDelay: 200;
  posX: 'left';
  posY: 'top';
}

export interface IPopupContentProps {
  children: ReactNode;
  onMouseEnter: ReactEventHandler<HTMLElement>;
  onMouseLeave: ReactEventHandler<HTMLElement>;
  repaint: () => any;
  style?: CSSProperties;
}
