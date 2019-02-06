/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export interface IText<T extends HTMLElement = HTMLParagraphElement> extends IBox<T> {
  leading?: IBox['lineHeight'];
  casing?: IBox['textTransform'];
  italic?: boolean;
}

export const Text: FunctionComponent<IText> = props => {
  const { as = 'p', leading: lineHeight, casing: textTransform, tracking: letterSpacing, italic, ...rest } = props;

  return (
    <Box
      {...rest}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      textTransform={textTransform}
      fontStyle={italic ? 'italic' : undefined}
      as={as}
      defaultCSS={textStyles()}
    />
  );
};

export const textStyles = () => ({
  margin: '0',
});
