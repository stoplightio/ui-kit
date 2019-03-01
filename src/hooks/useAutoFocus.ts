import { MutableRefObject, Ref, useEffect, useRef } from 'react';

export const useAutoFocus = <T extends Partial<{ focus: () => any }>>(autoFocus?: boolean, ref?: Ref<T>) => {
  const nodeRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(nodeRef.current);
    } else if ('current' in ref) {
      (ref as MutableRefObject<T | null>).current = nodeRef.current;
    }
  }, [nodeRef.current, ref]);

  useEffect(() => {
    const { current: node } = nodeRef;
    if (autoFocus && node !== null && node.focus) {
      node.focus();
    }
  }, [autoFocus, nodeRef.current]);

  return [nodeRef];
};
