import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeConsumer } from 'styled-components';
import { IThemeInterface } from './types';

export interface IPortalProps {
  children: any;
  className?: string;
}

export class Portal extends React.PureComponent<IPortalProps> {
  private readonly el?: HTMLDivElement;
  private readonly root = typeof document === 'object' ? document.body : null;

  constructor(props: IPortalProps) {
    super(props);

    if (typeof document === 'undefined' || typeof document.createElement !== 'function') return;

    this.el = document.createElement('div');

    if (props.className !== undefined) {
      this.el.className = props.className;
    }
  }

  public componentDidMount() {
    if (this.el !== undefined && this.root !== null) {
      this.root.appendChild(this.el);
    }
  }

  public componentWillUnmount() {
    if (this.el !== undefined && this.root !== null) {
      this.root.removeChild(this.el);
    }
  }

  private renderChildren = (theme: IThemeInterface) => {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children(theme);
    }

    return React.Children.map(this.props.children, child => React.cloneElement(child, { theme }));
  };

  public render() {
    if (this.el === undefined) {
      return null;
    }

    return ReactDOM.createPortal(<ThemeConsumer>{this.renderChildren}</ThemeConsumer>, this.el);
  }
}
