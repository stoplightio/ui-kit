import { Box, IBoxProps } from './Box';
import { styled } from './utils';

export interface IPopupProps extends IBoxProps {
  show: boolean;
}

export const Popup = styled<IPopupProps, 'div'>(Box as any)(
  {
    // @ts-ignore
    position: 'absolute',
  },
  (props: IPopupProps) => ({
    display: props.show ? '' : 'none'
  }),
);

Popup.defaultProps = {
  shadow: 'md',
  p: 'xl',
  m: '0 auto',
  show: false,
  top: 'auto',
};

