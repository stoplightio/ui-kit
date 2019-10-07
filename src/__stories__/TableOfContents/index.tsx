import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Button } from '@blueprintjs/core';
import { withKnobs } from '@storybook/addon-knobs';
import { StudioContents } from '../../__fixtures__/table-of-contents/studio';
import { Provider } from '../../Provider';
import { TableOfContents } from '../../TableOfContents';

const styles = {
  height: '100vh',
  borderRight: '1px solid #E6ECF1',
  backgroundColor: '#F5F7F9',
  paddingTop: 24,
  paddingLeft: 24,
};

storiesOf('TableOfContents', module)
  .addDecorator(withKnobs)
  .add('studio', () => {
    return (
      <div style={styles}>
        <Provider>
          <TableOfContents className="h-full" contents={StudioContents} />
        </Provider>
      </div>
    );
  })
  .add('mobile', () => {
    return (
      <Provider>
        <MobileStory />
      </Provider>
    );
  });

const MobileStory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div style={styles}>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <TableOfContents
        className="h-full"
        contents={StudioContents}
        title={'Mobile Support'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        enableDrawer={1000}
      />
    </div>
  );
};
