import { ClassNames, css } from '@emotion/core';
import * as React from 'react';
import { Tab } from 'react-tabs';

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

const tabStyle = css({
  display: 'inline-block',
  border: '1px solid transparent',
  borderBottom: 'none',
  bottom: '-1px',
  position: 'relative',
  listStyle: 'none',
  padding: '6px 12px',
  cursor: 'pointer',

  '&:focus': {
    boxShadow: '0 0 5px hsl(208, 99%, 50%)',
    borderColor: 'hsl(208, 99%, 50%)',
    outline: 'none',

    '&:after': {
      content: '',
      position: 'absolute',
      height: '5px',
      left: '-4px',
      right: '-4px',
      bottom: '-5px',
      background: '#fff',
    },
  },
});

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

export { StyledTab as Tab };
