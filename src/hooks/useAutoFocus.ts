import { MutableRefObject, Ref, useEffect, useRef } from 'react';

export const useAutoFocus = <T extends Partial<{ focus: () => any }>>(autoFocus?: boolean, ref?: Ref<T>) => {
  const nodeRef = useRef<T>(null);

  useEffect(() => {
    /**
     * This is needed for ref forwarding
     *
     * const YourComponent = React.forwardRef<HTMLInputElement, any>((props, ref) => {
     *   const [nodeRef] = useAutoFocus(props.autoFocus, ref);
     *
     *   return <input ref={nodeRef} value="foo" />;
     * });
     *
     * We also support a ref function (a bit older approach, pre createRef / forwardRef / useRef)
     */
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
