import { CSSProperties, RefObject } from 'react';
import { IPopupPositionOffset, IPopupProps } from './types';

const getOffset = (offset?: IPopupPositionOffset) =>
  Object.assign(
    {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    offset || null
  );

export const getDefaultStyle = ({ width, padding }: IPopupProps): CSSProperties => ({
  position: 'fixed',
  zIndex: 999,
  padding,
  width,
});

export const calculateStyles = (
  trigger: RefObject<HTMLElement>,
  content: RefObject<HTMLDivElement>,
  props: IPopupProps
): CSSProperties | null => {
  if (!trigger || !content || !trigger.current || !content.current) return null;

  const offset = getOffset(props.offset);

  // TODO: smart choice based on content size and screen space if props.posX not defined
  let posX = props.posX;

  // TODO: smart choice based on content size and screen space if props.posY not defined
  const posY = props.posY;

  // calculate the tooltip position
  // this style object will be passed to the renderContent function
  const style: CSSProperties = {};

  // where on the screen is the target
  const triggerDimensions = trigger.current.getBoundingClientRect();

  // where on the screen is the content, and some basics on its size
  const contentDimensions = content.current.getBoundingClientRect();
  const contentWidth = props.width || contentDimensions.width;

  style.minWidth = triggerDimensions.width + 25;

  if (posY === 'center') {
    if (posX === 'left') {
      posX = 'right';
    } else {
      posX = 'left';
    }
  }

  if (posX === 'left' || posX === 'center') {
    style.left = triggerDimensions.left;

    if (posX === 'center') {
      // center align the popup by taking both the target and popup widths into account
      style.left += triggerDimensions.width / 2 - contentWidth / 2;
    } else {
      style.left -= props.padding;

      // room for tip
      if (posY === 'center') {
        style.left += triggerDimensions.width + props.padding;
      }
    }

    // account for desired offsets
    style.left += offset.left || 0;
    style.left -= offset.right || 0;

    // make sure it doesn't poke off the left side of the page
    style.left = Math.max(0, style.left);

    let clientWidth = 0;
    if (typeof document !== 'undefined') {
      clientWidth = document.body.clientWidth;
    }

    // or off the right
    style.left = Math.min(style.left, clientWidth - contentWidth - 5);
  } else {
    // right
    // coming in from the right of the screen
    style.right = window.innerWidth - triggerDimensions.left - triggerDimensions.width - props.padding;

    // room for tip
    if (posY === 'center') {
      style.right += triggerDimensions.width + props.padding;
    }

    // account for desired offsets
    style.right -= offset.left;
    style.right += offset.right;

    // TODO: make sure it doesn't poke off the left side of the page

    // or off the right
    style.right = Math.max(0, style.right);
  }

  if (posY === 'top') {
    // when positioning above, set the bottom of the popup just above the top of the target (it will stretch upwards)
    style.bottom = window.innerHeight - triggerDimensions.top + offset.bottom;
  } else if (posY === 'bottom') {
    // when positioning below, position the top of the popup just below the target (it will stretch downwards)
    style.top = triggerDimensions.top + triggerDimensions.height + offset.top;
  } else {
    style.top = style.top = triggerDimensions.top + triggerDimensions.height / 2 - contentDimensions.height / 2;

    style.top += offset.top;
    style.top -= offset.bottom;
  }

  if (style.top) {
    // make sure it doesn't poke off the bottom of the page
    style.top = Math.min(window.innerHeight - contentDimensions.height, style.top as number);

    // make sure it doesn't poke off the top of the page
    style.top = Math.max(0, style.top);

    if (style.top + contentDimensions.height > window.innerHeight) {
      style.bottom = 0;
      style.overflow = 'auto';
    }
  } else if (style.bottom) {
    // make sure it doesn't poke off the top of the page
    style.bottom = Math.min(window.innerHeight, style.bottom as number);

    // make sure it doesn't poke off the top of the page
    style.bottom = Math.max(0, style.bottom);

    if (style.bottom + contentDimensions.height > window.innerHeight) {
      style.top = 0;
      style.overflow = 'auto';
    }
  }

  return style;
};
