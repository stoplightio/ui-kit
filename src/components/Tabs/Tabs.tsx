import { ITabProps as BPTabProps, ITabsProps as BPTabsProps, Tab as BPTab, Tabs as BPTabs } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TABS
 */
interface ITabsProps extends BPTabsProps {}

const Tabs: React.FunctionComponent<ITabsProps> = props => {
  return <BPTabs {...props} />;
};

/**
 * TAB
 */

interface ITabProps extends BPTabProps {}

const Tab: React.FunctionComponent<ITabProps> = props => {
  return <BPTab {...props} />;
};

/**
 * EXPORTS
 */
export { ITabProps, ITabsProps, Tab, Tabs };
