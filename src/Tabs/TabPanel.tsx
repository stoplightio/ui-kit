/* @jsx jsx */

import { ClassNames, jsx } from '@emotion/core';
import * as React from 'react';
import { TabPanel } from 'react-tabs';

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

const tabPanelStyle = { display: 'none' };
const selectedTabPanelStyle = { display: 'block' };

export { StyledTabPanel as TabPanel };
