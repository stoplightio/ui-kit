import * as React from 'react';

import { Box, IBox } from './Box';

export interface IText<T extends HTMLElement = HTMLParagraphElement> extends IBox<T> {
  leading?: IBox['lineHeight'];
  casing?: IBox['textTransform'];
  italic?: boolean;
}

const Text: React.FunctionComponent<IText> = React.forwardRef<HTMLElement, IText>(function Text(props, ref) {
  const { as = 'p', leading: lineHeight, casing: textTransform, tracking: letterSpacing, italic, css, ...rest } = props;

  return (
    <Box
      {...rest}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      textTransform={textTransform}
      fontStyle={italic ? 'italic' : undefined}
      as={as}
      ref={ref}
      css={[textStyles(), css]}
    />
  );
});

Text.displayName = 'Text';

export const textStyles = () => ({
  margin: '0',
});

export { Text };
