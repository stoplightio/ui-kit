import * as cn from 'classnames';
import * as React from 'react';
import { Tab, TabProps as ISimpleTabProps } from 'react-tabs';
import { Classes } from '../classes';

const SimpleTab: React.FunctionComponent<ISimpleTabProps> & { tabsRole: string } = props => {
  const { children, ref, className, selectedClassName, disabledClassName, ...rest } = props;

  return React.createElement(
    Tab,
    {
      className: cn(Classes.SIMPLE_TAB, className),
      selectedClassName: cn(selectedClassName, 'selected-tab'),
      disabledClassName: cn(disabledClassName, 'disabled-tab'),
      ...rest,
    },
    children
  );
};

SimpleTab.tabsRole = 'Tab';

export { SimpleTab, ISimpleTabProps };
