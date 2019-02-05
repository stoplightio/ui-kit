/* @jsx jsx */

import { ClassNames, jsx } from '@emotion/core';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { Tab } from 'react-tabs';
import { IBoxCSS } from '..';
import { useTheme } from '../theme';

const StyledTab: React.FunctionComponent<{ disabled?: boolean }> & { tabsRole: string } = props => {
  const theme = useTheme();
  const styles = tabStyles(theme.tabs);
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

const tabStyles = (tabTheme: { fg: string; bg: string }): Dictionary<IBoxCSS> => {
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
      backgroundColor: tabTheme.bg,
      color: tabTheme.fg,

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
          background: '#fff',
        },
      },
    },

    selectedTabStyle: {
      background: '#fff',
      borderColor: tabTheme.fg,
      color: tabTheme.fg,
      borderRadius: '5px 5px 0 0',
    },

    disabledTabStyle: {
      color: 'GrayText',
      cursor: 'default',
    },
  };
};

export { StyledTab as Tab };
