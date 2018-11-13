import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';

export interface IPortalProps {
  children: JSX.Element;
  className?: string;
}

export class Portal extends PureComponent<IPortalProps> {
  private readonly el!: HTMLDivElement;
  private readonly root = document.body;

  constructor(props: IPortalProps) {
    super(props);

    this.el = document.createElement('div');

    if (props.className !== undefined) {
      this.el.className = props.className;
    }
  }

  public componentDidMount() {
    this.root.appendChild(this.el);
  }

  public componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
