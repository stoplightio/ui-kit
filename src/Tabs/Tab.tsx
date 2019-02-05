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
      border: '1px solid transparent',
      borderBottom: 'none',
      bottom: '-1px',
      position: 'relative',
      listStyle: 'none',
      padding: '6px 12px',
      cursor: 'pointer',
      backgroundColor: theme.tabs.bg,
      color: theme.tabs.fg,

      '&:focus': {
        boxShadow: '0 0 5px hsl(208, 99%, 50%)',
        borderColor: 'hsl(208, 99%, 50%)',
        outline: 'none',

        '&::after': {
          content: '""',
          position: 'absolute',
          height: '5px',
          left: '-4px',
          right: '-4px',
          bottom: '-5px',
          backgroundColor: theme.tabs.bg,
        },
      },
    },

    selectedTabStyle: {
      backgroundColor: theme.tabs.bg,
      borderColor: theme.tabs.fg,
      color: theme.tabs.fg,
      borderRadius: '5px 5px 0 0',
    },

    disabledTabStyle: {
      color: `${theme.tabs.disabledFg} !important`,
      cursor: 'default !important',
    },
  };
};

export { StyledTab as Tab };
