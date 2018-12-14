import { MouseEventHandler, useEffect, useState } from 'react';
import { IBox } from '../Box';

export const useHover = (
  initialStyle: boolean,
  props: IBox<HTMLElement>,
  hideDelay?: number
): [boolean, { onMouseEnter: MouseEventHandler<HTMLElement>; onMouseLeave: MouseEventHandler<HTMLElement> }] => {
  let timer: null | NodeJS.Timer | number = null;
  const [state, setState] = useState<boolean>(false);

  const onMouseEnter: MouseEventHandler<HTMLElement> = e => {
    if (props.onMouseEnter) {
      props.onMouseEnter(e);
    }

    if (timer !== null) {
      clearTimeout(timer as number);
      timer = null;
    }

    setState(true);
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = e => {
    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }

    if (hideDelay !== undefined) {
      timer = setTimeout(setState, hideDelay, false);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    if (timer !== null) {
      clearTimeout(timer as number);
      timer = null;
    }
  });

  return [
    state,
    {
      onMouseEnter,
      onMouseLeave,
    },
  ];
};
