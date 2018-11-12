import { themeGet } from 'styled-system';
import { Box, IBoxProps } from './Box';
import { IThemeInterface } from './types';
import { position, styled } from './utils';

export interface IPopupProps extends IBoxProps {
  show: boolean;
  tip: boolean;
  position: 'left-top' | 'top' | 'right-top' | 'right' | 'right-bottom' | 'bottom' | 'left-bottom' | 'left';
  theme: IThemeInterface;
  offset: number;
}

const getFGColor = themeGet('colors.fg', '#000');

const styles = {
  'left-top': {
    bottom: '100%',
    right: '100%',
  },
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'right-top': {
    bottom: '100%',
    left: '100%',
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  'right-bottom': {
    left: '100%',
    top: '100%',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'left-bottom': {
    right: '100%',
    top: '100%',
  },
  left: {
    right: '100%',
    top: '50%%',
    transform: 'translateX(-50%)',
  },
};

export const Popup = styled<IPopupProps, 'Box'>(Box as any)(
  // @ts-ignore
  (props: IPopupProps) => ({
    height: 'auto',
    margin: `${props.offset}px`,
    position: 'absolute',
    boxShadow: `0 0 4px ${getFGColor(props)}`,
    width: 'auto',
    ...styles[props.position],
  }),
  (props: IPopupProps) =>
    !props.show && {
      display: 'none',
    }
);

Popup.defaultProps = {
  offset: 10,
  p: 'xl',
  position: 'top',
  m: '0 auto',
};
