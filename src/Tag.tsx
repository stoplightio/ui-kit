import { ITagProps as BPTagProps, Tag as BPTag } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TAG
 */
interface ITagProps extends BPTagProps {}

const Tag: React.FunctionComponent<ITagProps> = props => {
  return <BPTag {...props} />;
};

/**
 * EXPORTS
 */
export { ITagProps, Tag };
