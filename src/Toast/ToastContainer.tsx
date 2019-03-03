import { ClassNames } from '@emotion/core';
import { Omit } from '@stoplight/types';
import * as React from 'react';

import { ToastContainer as ReactToastContainer, ToastContainerProps as ReactToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IBoxCSS } from '../Box';
import { ITheme, useTheme } from '../theme';
import { IToastTransition } from './index';

/*
 * TOAST CONTAINER
 */
export interface IToastContainer extends Omit<ReactToastContainerProps, 'transition'> {
  transition?: IToastTransition;
}

export const ToastContainer = (props: IToastContainer) => {
  const { toast: theme } = useTheme();
  const { ...containerProps } = props;

  return (
    <ClassNames>
      {({ css: getClassName }) => (
        // @ts-ignore
        <ReactToastContainer
          progressClassName={getClassName(progressStyles(theme))}
          toastClassName={getClassName(toastStyles())}
          bodyClassName={getClassName(bodyStyles())}
          closeOnClick={false}
          {...containerProps}
          // custom close buttons should be defined on the content level
          closeButton={false}
        />
      )}
    </ClassNames>
  );
};

/*
 * STYLES
 */

const progressStyles = (theme: ITheme['toast']): IBoxCSS => ({
  background: theme.progressBg,
});

const bodyStyles = (): IBoxCSS => ({
  margin: 0,
  width: '100%',
  cursor: 'default',
});

const toastStyles = (): IBoxCSS => ({
  padding: 0,
});
