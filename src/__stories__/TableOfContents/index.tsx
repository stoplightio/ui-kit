import { Button } from '@blueprintjs/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { StudioContents } from '../../__fixtures__/table-of-contents/studio';
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
        <TableOfContents
          className="h-full"
          contents={StudioContents}
          rowRenderer={(item, DefaultRow) => {
            return (
              <a href={item.href}>
                <DefaultRow item={item} />
              </a>
            );
          }}
        />
      </div>
    );
  })
  .add('studio without rowRenderer', () => {
    return (
      <div style={styles}>
        <TableOfContents className="h-full" contents={StudioContents} />
      </div>
    );
  })
  .add('mobile', () => {
    return <MobileStory />;
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
        rowRenderer={(item, DefaultRow) => {
          return (
            <a href={item.href}>
              <DefaultRow item={item} />
            </a>
          );
        }}
      />
    </div>
  );
};
