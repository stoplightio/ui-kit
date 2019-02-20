/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { TabList, TabListProps } from 'react-tabs';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => (
  // @ts-ignore ref type is incompatible after @types/react bump
  <TabList {...props} css={tabListStyle}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle = {
  margin: '0',
  padding: '0',
  userSelect: 'none',
};

export { StyledTabList as TabList };
