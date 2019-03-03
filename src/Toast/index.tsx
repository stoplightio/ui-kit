import { Omit } from '@stoplight/types';
import * as React from 'react';
import {
  Bounce as ReactTransitionBounce,
  Flip as ReactTransitionFlip,
  Slide as ReactTransitionSlide,
  toast as ReactToast,
  ToastOptions,
  TypeOptions as ToastType,
  Zoom as ReactTransitionZoom,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IBox } from '../Box';
import { IToastContent, ToastContent } from './ToastContent';

/**
 * TOAST
 */
export interface IToast extends IToastContent, Omit<ToastOptions, 'transition'> {
  transition?: IToastTransition;
  attributes?: IBox<HTMLElement>;
}

export function Toast(options: IToast) {
  const {
    title,
    message,
    icon,
    closeIcon,
    render: customRenderer,
    attributes = {},
    transition = 'zoom',
    ...toastOptions
  } = options;

  return ReactToast(
    <ToastContent
      title={title}
      message={message}
      type={options.type}
      icon={icon}
      closeIcon={closeIcon}
      render={customRenderer}
      {...attributes}
    />,
    {
      ...toastOptions,
      transition: ToastTransitionMap[transition],
    }
  );
}

/**
 * TRANSITIONS
 */
export type IToastTransition = 'bounce' | 'flip' | 'slide' | 'zoom';
export const ToastTransitionMap = {
  bounce: ReactTransitionBounce,
  flip: ReactTransitionFlip,
  slide: ReactTransitionSlide,
  zoom: ReactTransitionZoom,
};

/**
 * MISC
 */
export * from './ToastContent';
export * from './ToastContainer';
export { ToastType };
