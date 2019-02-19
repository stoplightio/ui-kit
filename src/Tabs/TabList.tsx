import * as React from 'react';

import { Dictionary } from '@stoplight/types';
import { TabList, TabListProps } from 'react-tabs';
import { IBoxCSS, useTheme } from '..';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => (
  // @ts-ignore ref type is incompatible after @types/react bump
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
