import cn from 'classnames';
import * as React from 'react';
import { TabList as ReactTabList } from 'react-tabs';

import { Classes } from '../classes';

type ISimpleTabListProps = React.ComponentProps<typeof ReactTabList>;

/**
 * TAB LIST
 */
const SimpleTabList: React.FunctionComponent<ISimpleTabListProps> & { tabsRole: string } = props => {
  const { children, className, ...rest } = props;
  return React.createElement(ReactTabList, { className: cn(Classes.SIMPLE_TAB_LIST, className), ...rest }, children);
};

SimpleTabList.tabsRole = 'TabList';

/**
 * EXPORTS
 */
export { SimpleTabList, ISimpleTabListProps };
