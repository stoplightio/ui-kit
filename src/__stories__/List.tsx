import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IList, List } from '../List';
import { ListStylePosition, ListStyleType } from './_utils';

export const listKnobs = (tabName = 'List'): IList => ({
  listStyle: select('listStyle', ListStyleType, '', tabName),
  listStylePosition: select<any>('listStylePosition', ListStylePosition, 'initial', tabName),
});

storiesOf('List', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <List {...listKnobs()}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </List>
  ));
