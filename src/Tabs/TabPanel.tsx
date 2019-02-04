import { ClassNames } from '@emotion/core';
import css from '@emotion/css';
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

const tabPanelStyle = css({ display: 'none' });
const selectedTabPanelStyle = css({ display: 'block' });

export { StyledTabPanel as TabPanel };
