import { ClassNames } from '@emotion/core';
import * as React from 'react';
import { TabPanel, TabPanelProps } from 'react-tabs';
import { IBoxCSS } from '../Box';
import { useTheme } from '../theme';

const StyledTabPanel: React.FunctionComponent<TabPanelProps> & { tabsRole: string } = props => {
  const tabPanelCSS = tabPanelStyle();

  return (
    <ClassNames>
      {({ css: getClassName }) => (
        // @ts-ignore ref type is incompatible after @types/react bump
        <TabPanel
          {...props}
          className={getClassName(tabPanelCSS)}
          selectedClassName={getClassName(selectedTabPanelStyle)}
        >
          {props.children}
        </TabPanel>
      )}
    </ClassNames>
  );
};

StyledTabPanel.tabsRole = 'TabPanel';

const tabPanelStyle = (): IBoxCSS => {
  const theme = useTheme();

  return {
    border: `1px solid ${theme.tabs.border}`,
    display: 'none',
    padding: '4px 8px',
  };
};

const selectedTabPanelStyle = { display: 'block' };

export { StyledTabPanel as TabPanel };
