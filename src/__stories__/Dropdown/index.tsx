import { action } from '@storybook/addon-actions';
import { array, boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Icon } from '../..';
import { Dropdown, IDropdown } from '../../Dropdown/Dropdown';

export const dropdownKnobs = (tabName = 'Dropdown'): Partial<IDropdown> => ({
  items: array('items', ['foo', 'bar', 'baz'], ',', tabName),
  filterable: boolean('filterable', false, tabName),
  maxRows: number('maxRows', 10, { min: 1, max: Infinity, range: false, step: 1 }, tabName),
  itemSize: number('itemSize', 30, { min: 1, max: Infinity, range: false, step: 1 }, tabName),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Dropdown {...(dropdownKnobs() as IDropdown)} onItemSelect={action('onItemSelect')}>
      <div className="flex items-center justify-center cursor-pointer text-xl p-2">
        Open
        <Icon className="pl-1 -mr-2" icon="caret-down" iconSize={14} />
      </div>
    </Dropdown>
  ));
