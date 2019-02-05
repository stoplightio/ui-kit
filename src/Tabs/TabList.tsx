/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { TabList, TabListProps } from 'react-tabs';
import { IBoxCSS, useTheme } from '..';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => (
  <TabList {...props} css={tabListStyle()}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle = (): Dictionary<IBoxCSS> => {
  const theme = useTheme();

  return {
    borderBottom: `1px solid ${theme.tabs.border}`,
    margin: '0 0 10px',
    padding: '0',
  };
};

export { StyledTabList as TabList };
