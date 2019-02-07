/** @jsx jsx */

import { ClassNames, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { TabPanel, TabPanelProps } from 'react-tabs';

const StyledTabPanel: FunctionComponent<TabPanelProps> & { tabsRole: string } = props => (
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
