import * as cn from 'classnames';
import * as React from 'react';
import { TabPanel, TabPanelProps as ISimpleTabPanelProps } from 'react-tabs';
import { Classes } from '../classes';

/**
 * TAB PANEL
 */
const SimpleTabPanel: React.FunctionComponent<ISimpleTabPanelProps> & { tabsRole: string } = props => {
  const { children, ref, className, selectedClassName, ...rest } = props;

  return React.createElement(
    TabPanel,
    {
      className: cn(Classes.SIMPLE_TAB_PANEL, className),
      selectedClassName: cn('block', selectedClassName),
      ...rest,
    },
    children
  );
};

SimpleTabPanel.tabsRole = 'TabPanel';

/**
 * EXPORTS
 */
export { SimpleTabPanel, ISimpleTabPanelProps };
