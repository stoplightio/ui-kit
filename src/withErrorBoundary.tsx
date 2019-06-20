import _isEqual = require('lodash/isEqual');
import * as React from 'react';

const FallbackComponent: FallbackComponent = ({ error }) => {
  return (
    <div className="p-4">
      <b>Error</b>
      {error && `: ${error.message}`}
    </div>
  );
};

export type FallbackComponent = React.ComponentType<{ error: Error | null }>;
export interface IErrorBoundary {
  FallbackComponent?: FallbackComponent;
}

// react-error-boundary does not support recovering, see  https://github.com/bvaughn/react-error-boundary/pull/16/files
export function withErrorBoundary<T extends IErrorBoundary>(
  WrappedComponent: React.ComponentType<Omit<T, 'FallbackComponent'>>,
  props?: Array<keyof T>,
  displayName?: string
) {
  return class ErrorBoundary extends React.PureComponent<T, { error: Error | null }> {
    public state = {
      error: null,
    };

    public static displayName = displayName;

    public componentDidUpdate(prevProps: Readonly<T>) {
      if (this.state.error !== null) {
        if (!props || !props.length) {
          if (!_isEqual(this.props, prevProps)) {
            this.setState({ error: null });
          }
        } else {
          for (const prop of props) {
            if (!_isEqual(this.props[prop], prevProps[prop])) {
              this.setState({ error: null });
            }
          }
        }
      }
    }

    // there is no error hook yet, see https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks
    public static getDerivedStateFromError(error: Error) {
      return { error };
    }

    public render() {
      const { FallbackComponent: Fallback = FallbackComponent, ...props } = this.props;
      if (this.state.error) {
        return <Fallback error={this.state.error} />;
      }

      return <WrappedComponent {...props} />;
    }
  };
}
