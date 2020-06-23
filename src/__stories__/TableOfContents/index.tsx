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
    return <CustomComponentStory />;
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

const NavigationContext = React.createContext({ path: '', setPath: (_: string) => {} });

const CustomComponentStory = () => {
  const [path, setPath] = React.useState('/reference/petstore/openapi.v1.yaml/paths/~1pets~1{petId}/get');

  const contextValue = React.useMemo(() => ({ path, setPath }), [path, setPath]);

  const contentsWithDynamicIsActive = React.useMemo(() => {
    return studioContents.map(c => ({ ...c, isActive: c.to === path }));
  }, [path]);

  return (
    <NavigationContext.Provider value={contextValue}>
      <div style={styles}>
        <TableOfContents className="h-full" contents={contentsWithDynamicIsActive} rowComponent={RowComponent} />
      </div>
    </NavigationContext.Provider>
  );
};

const RowComponent: RowComponentType<ITableOfContentsLink> = props => {
  const { setPath } = React.useContext(NavigationContext);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (props.item.to) {
        setPath(props.item.to);
      }
      e.preventDefault();
    },
    [props.item.to, setPath],
  );

  return (
    <a href={props.item.to} onClick={handleClick}>
      <DefaultRow {...props} />
    </a>
  );
};
