/* @jsx jsx */

import { ClassNames, jsx } from '@emotion/core';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { Tab, TabProps } from 'react-tabs';
import { IBoxCSS } from '..';
import { useTheme } from '../theme';

const StyledTab: React.FunctionComponent<TabProps> & { tabsRole: string } = props => {
  const styles = tabStyles();
  return (
    <ClassNames>
      {({ css: getClassName }) => (
        // @ts-ignore
        <Tab
          {...props}
          className={getClassName(styles.tabStyle)}
          disabledClassName={getClassName(styles.disabledTabStyle)}
          selectedClassName={getClassName(styles.selectedTabStyle)}
        >
          {props.children}
        </Tab>
      )}
    </ClassNames>
  );
};

StyledTab.tabsRole = 'Tab';

const tabStyles = (): Dictionary<IBoxCSS> => {
  const theme = useTheme();
  return {
    tabStyle: {
      display: 'inline-block',
      border: `1px solid ${theme.tabs.border}`,
      fontSize: '0.9rem',
      fontWeight: 'bold',
      bottom: '-1px',
      position: 'relative',
      listStyle: 'none',
      padding: '7px 15px',
      cursor: 'pointer',
      backgroundColor: theme.tabs.bg,
      color: theme.tabs.fg,
      zIndex: 2,

      ':first-of-type': {
        borderTopLeftRadius: '3px',
      },

      ':last-of-type': {
        borderTopRightRadius: '3px',
      },

      ':focus': {
        outline: 'none',
      },
    },

    selectedTabStyle: {
      backgroundColor: theme.tabs.selectedBg,
      borderBottomColor: theme.tabs.selectedBg,
      color: theme.tabs.selectedFg,
    },

    disabledTabStyle: {
      cursor: 'default',
      opacity: 0.5,
    },
  };
};

export { StyledTab as Tab };
