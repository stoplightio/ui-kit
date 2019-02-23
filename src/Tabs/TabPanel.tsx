import { ClassNames } from '@emotion/core';
import * as React from 'react';
import { TabPanel, TabPanelProps } from 'react-tabs';
import { IBoxCSS } from '../Box';
import { ITheme, useTheme } from '../theme';

const StyledTabPanel: React.FunctionComponent<TabPanelProps> & { tabsRole: string } = props => {
  const { tabs: theme } = useTheme();
  const tabPanelCSS = tabPanelStyle(theme);

  return (
    <ClassNames>
      {({ css: getClassName }) => (
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

const tabPanelStyle = (theme: ITheme['tabs']): IBoxCSS => {
  return {
    border: `1px solid ${theme.border}`,
    display: 'none',
    padding: '25px',
    borderRadius: 3,
  };
};

const selectedTabPanelStyle = { display: 'block' };

export { StyledTabPanel as TabPanel };
