import * as React from 'react';

import { Portal } from '../Portal';
import { IPopupContentProps } from './types';

export const PopupContent = React.forwardRef<HTMLDivElement, IPopupContentProps>((props, ref) => {
  const { onMouseEnter, onMouseLeave, repaint, style } = props;
  const lastChildRef = React.useRef<HTMLElement>(null);

  React.useEffect(repaint, [lastChildRef.current]);

  const count = React.Children.count(props.children);

  return (
    <Portal>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref} style={style}>
        {React.Children.map(props.children, (child, i) => {
          if (i !== count - 1) {
            return child;
          }

          // the purpose of doing this is to get rid of that forced re-render
          return React.cloneElement(child as React.ReactElement<any>, { ref: lastChildRef });
        })}
      </div>
    </Portal>
  );
});
