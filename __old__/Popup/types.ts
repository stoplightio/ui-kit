import * as React from 'react';

export type PopupTriggerRenderer = (
  props: {
    isVisible: boolean;
    isOver: boolean;
    showPopup: () => void;
    hidePopup: () => void;
  }
) => any;

export type PopupContentRenderer = (
  props: {
    isVisible: boolean;
    isOver: boolean;
    showPopup: () => void;
    hidePopup: () => void;
  }
) => any;

export interface IPopupPosition {
  width?: number; // force a width
  padding: number; // transparent space around the popup
  offset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  posX: 'left' | 'center' | 'right';
  posY: 'top' | 'center' | 'bottom';
}

export interface IPopupProps extends IPopupPosition {
  hideDelay: number; // how long popup will show for after user mouses out
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
  children: React.ReactChildren;
  onMouseEnter: (e: React.SyntheticEvent<HTMLElement>) => any;
  onMouseLeave: (e: React.SyntheticEvent<HTMLElement>) => any;
  repaint: () => any;
  style?: React.CSSProperties;
}
