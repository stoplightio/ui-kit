import * as React from 'react';

import { Portal } from '../Portal';
import { IPopupContentProps } from './types';

const PopupContent: React.FunctionComponent<IPopupContentProps & { ref?: any }> = React.forwardRef<
  HTMLDivElement,
  IPopupContentProps
>(function PopupContent(props, ref) {
  const { children, onMouseEnter, onMouseLeave, repaint, style } = props;

  React.useEffect(repaint, []);

  return (
    <Portal>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref} style={style}>
        {children}
      </div>
    </Portal>
  );
});

PopupContent.displayName = 'PopupContent';
export { PopupContent };
