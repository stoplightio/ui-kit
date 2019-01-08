import 'react-window';

declare module 'react-window' {
  export function areEqual(prevProps: Readonly<Object>, nextProps: Readonly<Object>): boolean;
  export function shouldComponentUpdate(
    nextProps: Readonly<Object>,
    nextState: Readonly<Object>,
    nextContext: any
  ): boolean;
}
