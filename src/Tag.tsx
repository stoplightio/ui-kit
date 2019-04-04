import { ITagProps as BPTagProps, Tag as BPTag } from '@blueprintjs/core';
import * as React from 'react';

interface ITag extends BPTagProps {}
const Tag: React.FunctionComponent<ITag> = props => {
  return <BPTag {...props} />;
};

export { ITag, Tag };
