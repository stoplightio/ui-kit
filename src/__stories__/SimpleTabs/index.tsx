import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '../../SimpleTabs';

storiesOf('SimpleTabs', module)
  .addDecorator(storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>)
  .add('with defaults', () => (
    <div className="p-10">
      <SimpleTabs>
        <SimpleTabList>
          <SimpleTab>Title 1</SimpleTab>
          <SimpleTab>Title 2</SimpleTab>
        </SimpleTabList>

        <SimpleTabPanel>
          <h3>Any content 1</h3>
        </SimpleTabPanel>
        <SimpleTabPanel>
          <h2>Any content 2</h2>
        </SimpleTabPanel>
      </SimpleTabs>
    </div>
  ))
  .add('disabled Simpletab', () => (
    <div className="p-10">
      <SimpleTabs>
        <SimpleTabList>
          <SimpleTab>Title 1</SimpleTab>
          <SimpleTab disabled={true}>Title 2</SimpleTab>
        </SimpleTabList>

        <SimpleTabPanel>
          <h3>Any content 1</h3>
        </SimpleTabPanel>
        <SimpleTabPanel>
          <h2>Any content 2</h2>
        </SimpleTabPanel>
      </SimpleTabs>
    </div>
  ));
