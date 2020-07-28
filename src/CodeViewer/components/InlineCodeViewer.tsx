import * as cn from 'classnames';
import * as React from 'react';

import { Classes } from '../../classes';

export interface IInlineCodeViewerProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
}

export const InlineCodeViewer: React.FC<IInlineCodeViewerProps> = ({ className, value, ...rest }) => {
  return (
    <code className={cn(Classes.CODE_EDITOR, className, `${Classes.CODE_EDITOR}--inline`)} {...rest}>
      {value}
    </code>
  );
};
