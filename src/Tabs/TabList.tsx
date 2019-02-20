/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { TabList, TabListProps } from 'react-tabs';
import { IBoxCSS } from '../Box';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => (
  <TabList {...props} css={tabListStyle}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle: IBoxCSS = {
  margin: '0',
  padding: '0',
  'user-select': 'none',
};

export { StyledTabList as TabList };
