import * as cn from 'classnames';
import * as React from 'react';
import { Classes } from '../classes';

import { TabList as ReactTabList, TabListProps as ISimpleTabListProps } from 'react-tabs';

/**
 * TAB LIST
 */
const SimpleTabList: React.FunctionComponent<ISimpleTabListProps> & { tabsRole: string } = props => {
  const { children, className, ...rest } = props;
  return React.createElement(ReactTabList, { className: cn(Classes.SIMPLE_TAB_LIST), ...rest }, children);
};

SimpleTabList.tabsRole = 'TabList';

/**
 * EXPORTS
 */
export { SimpleTabList, ISimpleTabListProps };
