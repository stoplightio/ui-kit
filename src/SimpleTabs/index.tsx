import * as React from 'react';
import { Tabs as SimpleTabs } from 'react-tabs';

type ISimpleTabsProps = React.ComponentProps<typeof SimpleTabs>;

export * from './Tab';
export * from './TabList';
export * from './TabPanel';
export { SimpleTabs };
export type { ISimpleTabsProps };
