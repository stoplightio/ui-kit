import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { List } from '../List';
import { ListStylePosition, ListStyleType } from './_utils';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const listKnobs = (tabName = 'List'): any => {
  return omitBy(
    {
      itemType: select('itemType', ListStyleType, '', tabName),
      listPosition: select('listPosition', ListStylePosition, '', tabName),
    },
    val => !val
  );
};

storiesOf('List', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <List {...listKnobs()} {...textKnobs()} {...boxKnobs()}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </List>
  ));
