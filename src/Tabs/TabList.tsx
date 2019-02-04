import { css } from '@emotion/core';
import * as React from 'react';
import { TabList } from 'react-tabs';

const StyledTabList: React.FunctionComponent & { tabsRole: string } = props => (
  <TabList {...props} css={tabListStyle}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle = css({
  borderBottom: '1px solid #aaa',
  margin: '0 0 10px',
  padding: '0',
});

export { StyledTabList as TabList };
