import { replace } from 'lodash';
import * as React from 'react';
// @ts-ignore
import { positionValues, Scrollbars } from 'react-custom-scrollbars';

import { Box, IBoxProps } from './Box';

// Use scroll container when the content being loaded/scrolled is not a list

interface IScrollContainerProps extends IBoxProps {
  // can scroll to an anchor/id
  scrollTo?: string;
  // if use are using this as a list scroller children should be an array
  children?: any;

  onUpdate?: (values: positionValues) => void;
}

// auto scroll and scroll to index should not be used together
export class ScrollContainer extends React.Component<IScrollContainerProps> {
  public scrollbar: any;

  public componentDidMount() {
    this.scrollToHash(this.props.scrollTo);
  }

  public componentDidUpdate(prevProps: IScrollContainerProps) {
    if (prevProps.scrollTo !== this.props.scrollTo) {
      this.scrollToHash(this.props.scrollTo);
    }
  }

  private onUpdate = (values: positionValues) => {
    const { onUpdate } = this.props;

    if (onUpdate) {
      onUpdate(values);
    }
  };

  private scrollToHash = (hash?: string) => {
    setTimeout(() => {
      const elementId = replace(hash || window.location.hash, '#', '');
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 200);
  };

  public scrollTop = (top = 0) => {
    return this.scrollbar.scrollTop(top);
  };
  public scrollLeft = (left = 0) => {
    return this.scrollbar.scrollLeft(left);
  };
  public scrollToTop = () => {
    return this.scrollbar.scrollToTop();
  };
  public scrollToBottom = () => {
    return this.scrollbar.scrollToBottom();
  };
  public scrollToLeft = () => {
    return this.scrollbar.scrollToLeft();
  };
  public scrollToRight = () => {
    return this.scrollbar.scrollToRight();
  };
  public getScrollLeft = () => {
    return this.scrollbar.getScrollLeft();
  };
  public getScrollTop = () => {
    return this.scrollbar.getScrollTop();
  };
  public getScrollWidth = () => {
    return this.scrollbar.getScrollWidth();
  };
  public getScrollHeight = () => {
    return this.scrollbar.getScrollHeight();
  };
  public getClientWidth = () => {
    return this.scrollbar.getClientWidth();
  };
  public getClientHeight = () => {
    return this.scrollbar.getClientHeight();
  };

  public render() {
    // pull out scrollTo so they are not in scrollbarProps (don't want them spred onto <Scrollbars /> component)
    const { scrollTo, children, ...scrollbarProps } = this.props;

    return (
      <Scrollbars
        {...scrollbarProps}
        ref={(ref: any) => (this.scrollbar = ref)}
        autoHideTimeout={100}
        autoHeight={true}
        onUpdate={this.onUpdate}
        // Custom component overrides
        renderTrackHorizontal={({ ...props }) => (
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              bottom: 2,
              left: 2,
              right: 10,
              cursor: 'pointer',
            }}
          />
        )}
        renderThumbHorizontal={({ ...props }) => {
          return <Box radius="full" height="6px" bg="scrollbar.bg" cursor="grab" />;
        }}
        renderTrackVertical={({ ...props }) => (
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              right: 2,
              top: 2,
              bottom: 10,
              cursor: 'pointer',
            }}
          />
        )}
        renderThumbVertical={({ ...props }) => {
          return <Box radius="full" width="6px" bg="scrollbar.bg" cursor="grab" />;
        }}
      >
        {children}
      </Scrollbars>
    );
  }
}
