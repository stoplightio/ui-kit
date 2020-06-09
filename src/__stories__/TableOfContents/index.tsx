import { Button } from '@blueprintjs/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { studioContents } from '../../__fixtures__/table-of-contents/studio';
import { DefaultRow, ITableOfContentsLink, RowComponentType, TableOfContents } from '../../TableOfContents';

const styles = {
  height: '100vh',
  borderRight: '1px solid #E6ECF1',
  backgroundColor: '#F5F7F9',
  paddingTop: 24,
  paddingLeft: 24,
};

storiesOf('TableOfContents', module)
  .addDecorator(withKnobs)
  .add('studio /w custom RowComponent', () => {
    return (
      <div style={styles}>
        <TableOfContents className="h-full" contents={studioContents} rowComponent={RowComponent} />
      </div>
    );
  })
  .add('studio without rowComponent', () => {
    return (
      <div style={styles}>
        <TableOfContents className="h-full" contents={studioContents} />
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
        contents={studioContents}
        title={'Mobile Support'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        enableDrawer={1000}
        rowComponent={RowComponent}
      />
    </div>
  );
};

const RowComponent: RowComponentType<ITableOfContentsLink> = props => (
  <a href={props.item.to}>
    <DefaultRow {...props} />
  </a>
);
