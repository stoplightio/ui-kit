/* @jsx jsx */

import { ClassNames, css, jsx } from '@emotion/core';
import * as React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const StyledTab: React.FunctionComponent & { tabsRole: string } = props => (
  <ClassNames>
    {({ css: getClassName }) => (
      <Tab
        {...props}
        className={getClassName(tabStyle)}
        disabledClassName={getClassName(disabledTabStyle)}
        selectedClassName={getClassName(selectedTabStyle)}
      >
        {props.children}
      </Tab>
    )}
  </ClassNames>
);

StyledTab.tabsRole = 'Tab';

const tabStyle = css`
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;

    &:after {
      content: '';
      position: absolute;
      height: 5px;
      left: -4px;
      right: -4px;
      bottom: -5px;
      background: #fff;
    }
  }
`;

const selectedTabStyle = css({
  background: '#fff',
  borderColor: '#aaa',
  color: 'black',
  borderRadius: '5px 5px 0 0',
});

const disabledTabStyle = css({
  color: 'GrayText',
  cursor: 'default',
});

const StyledTabList: React.FunctionComponent & { tabsRole: string } = props => (
  <TabList {...props} css={tabListStyle}>
    {props.children}
  </TabList>
);

StyledTabList.tabsRole = 'TabList';

const tabListStyle = css({
  borderBottom: '1px solid #aaa',
  margin: '0 0 10px',
  padding: '0'
});

const StyledTabPanel: React.FunctionComponent & { tabsRole: string } = props => (
  <ClassNames>
    {({ css: getClassName }) => (
      <TabPanel
        {...props}
        className={getClassName(tabPanelStyle)}
        selectedClassName={getClassName(selectedTabPanelStyle)}
      >
        {props.children}
      </TabPanel>
    )}
  </ClassNames>
);

StyledTabPanel.tabsRole = 'TabPanel';

const tabPanelStyle = css({ display: 'none' });
const selectedTabPanelStyle = css({ display: 'block' });

export { Tabs, StyledTabList as TabList, StyledTab as Tab, StyledTabPanel as TabPanel };
