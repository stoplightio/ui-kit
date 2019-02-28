import { ClassNames } from '@emotion/core';
import * as React from 'react';
import { toast as toastify, ToastContainer, ToastOptions, ToastType } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IBox, IBoxCSS } from '../Box';
import { ITheme, useTheme } from '../theme';
import { Toast } from './Toast';

export interface IToastContent {
  title: string;
  body: string;
}

export interface IToast extends IBox<HTMLElement> {
  content: IToastContent;
  type: string;
}

export function toast(content: IToastContent, options?: ToastOptions) {
  const type = (options && options.type) || ToastType.DEFAULT;
  return toastify(<Toast content={content} type={type} />, options);
}

export const Toaster = () => {
  const { toaster: theme } = useTheme();

  return (
    <ClassNames>
      {({ css: getClassName }) => (
        <ToastContainer
          toastClassName={getClassName(toastStyles(theme))}
          progressClassName={getClassName(progressStyles(theme))}
        />
      )}
    </ClassNames>
  );
};

const progressStyles = (theme: ITheme['toaster']): IBoxCSS => {
  return {
    background: theme.progressBg,
  };
};

const toastStyles = (theme: ITheme['toaster']): IBoxCSS => {
  return {
    background: theme.toastBg,
    color: theme.toastFg,
  };
};
