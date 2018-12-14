import { MouseEventHandler, useEffect, useState } from 'react';
import { IBox } from '../Box';

export const useHover = (
  initialState: boolean,
  props: IBox<HTMLElement>,
  hideDelay?: number
): [boolean, { onMouseEnter: MouseEventHandler<HTMLElement>; onMouseLeave: MouseEventHandler<HTMLElement> }] => {
  let timer: null | NodeJS.Timer | number = null;
  const [state, setState] = useState<boolean>(initialState);

  const onMouseEnter: MouseEventHandler<HTMLElement> = e => {
    if (props && props.onMouseEnter) {
      props.onMouseEnter(e);
    }

    if (timer !== null) {
      clearTimeout(timer as number);
      timer = null;
    }

    setState(true);
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = e => {
    if (props && props.onMouseLeave) {
      props.onMouseLeave(e);
    }

    if (hideDelay !== undefined) {
      timer = setTimeout(setState, hideDelay, false);
    } else {
      setState(false);
    }
  };

  useEffect(
    () => {
      if (timer !== null) {
        clearTimeout(timer as number);
        timer = null;
      }
    },
    [timer]
  );

  return [
    state,
    {
      onMouseEnter,
      onMouseLeave,
    },
  ];
};
