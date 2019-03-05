import { Omit } from '@stoplight/types';
import isNil = require('lodash/isNil');
import pickBy = require('lodash/pickBy');
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

import { IToastContent, ToastContent } from './ToastContent';

/**
 * TOAST
 */
export interface IToast extends IToastContent, Omit<ToastOptions, 'transition'> {
  transition?: IToastTransition;
}

export function Toast(options: IToast) {
  const {
    actions = [],
    type = 'default',
    transition,
    onOpen,
    onClose,
    toastId,
    progress,
    pauseOnHover,
    pauseOnFocusLoss,
    closeOnClick,
    autoClose,
    position,
    progressClassName,
    progressStyle,
    className,
    bodyClassName,
    hideProgressBar,
    draggable,
    draggablePercent,
    ...contentProps
  } = options;

  return ReactToast(
    <ToastContent type={type} actions={actions} {...contentProps} />,
    pickBy(
      {
        onOpen,
        onClose,
        toastId,
        progress,
        pauseOnHover,
        pauseOnFocusLoss,
        closeOnClick,
        position,
        progressClassName,
        progressStyle,
        className,
        bodyClassName,
        hideProgressBar,
        draggable,
        draggablePercent,
        autoClose: options.hasOwnProperty('autoClose') ? autoClose : actions.length ? false : undefined,
        transition: transition && ToastTransitionMap[transition],
      },
      val => !isNil(val)
    )
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
