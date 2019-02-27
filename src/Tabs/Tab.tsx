/* @jsx jsx */

import { ClassNames, jsx } from '@emotion/core';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { Tab, TabProps } from 'react-tabs';

import { IBoxCSS } from '..';
import { ITheme, useTheme } from '../theme';

const StyledTab: React.FunctionComponent<TabProps> & { tabsRole: string } = props => {
  const { tabs: theme } = useTheme();

  const styles = tabStyles(theme);

  const { children, ref, ...rest } = props;

  return (
    <ClassNames>
      {({ css: getClassName }) => (
        <Tab
          {...rest}
          className={getClassName(styles.tabStyle)}
          disabledClassName={getClassName(styles.disabledTabStyle)}
          selectedClassName={getClassName(styles.selectedTabStyle)}
        >
          {children}
        </Tab>
      )}
    </ClassNames>
  );
};

StyledTab.tabsRole = 'Tab';

const tabStyles = (theme: ITheme['tabs']): Dictionary<IBoxCSS> => {
  return {
    tabStyle: {
      display: 'inline-block',
      border: `1px solid ${theme.border}`,
      fontWeight: 'bold',
      bottom: '-1px',
      position: 'relative',
      listStyle: 'none',
      padding: '8px 15px',
      cursor: 'pointer',
      backgroundColor: theme.bg,
      color: theme.fg,
      zIndex: 2,
      marginLeft: -1,

      ':first-of-type': {
        borderTopLeftRadius: '3px',
        marginLeft: 0,
      },

      ':last-of-type': {
        borderTopRightRadius: '3px',
      },

      ':focus': {
        outline: 'none',
      },

      ':hover': {
        color: theme.selectedFg,
      },
    },

    selectedTabStyle: {
      backgroundColor: theme.selectedBg,
      borderBottomColor: theme.selectedBg,
      color: theme.selectedFg,
    },

    disabledTabStyle: {
      cursor: 'default',
      opacity: 0.5,
    },
  };
};

export { StyledTab as Tab };
