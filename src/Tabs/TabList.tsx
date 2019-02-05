/* @jsx jsx */

import { jsx } from '@emotion/core';
import * as React from 'react';
import { TabList, TabListProps } from 'react-tabs';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => (
  <TabList {...props} css={tabListStyle}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle = {
  borderBottom: '1px solid #aaa',
  margin: '0 0 10px',
  padding: '0',
};

export { StyledTabList as TabList };
