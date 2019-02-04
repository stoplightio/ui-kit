import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from '../../Tabs';
import { storiesOf } from '@storybook/react';

storiesOf('Miscellaneous:Tabs', module)
  .addDecorator(storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>)
  .add('with defaults', () => <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h3>Any content 1</h3>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
  )
