import { Button } from '@blueprintjs/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { studioContents } from '../../__fixtures__/table-of-contents/studio';
import { tree } from '../../__fixtures__/table-of-contents/tree';
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
    return <SimpleCustomComponentStory />;
  })
  .add('studio /w custom RowComponent and extra props', () => {
    return <CustomComponentWithExtraPropsStory />;
  })
  .add('studio without rowComponent', () => {
    return (
      <div style={styles}>
        <TableOfContents className="h-full" contents={studioContents} />
      </div>
    );
  })
  .add('nested tree', () => {
    return (
      <div style={styles}>
        <TableOfContents className="h-full" contents={tree} />
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
        rowComponent={RowComponentWithExtraProps}
        rowComponentExtraProps={{ helloString: 'a' }}
      />
    </div>
  );
};

const NavigationContext = React.createContext({ path: '', setPath: (_: string) => {} });

const SimpleCustomComponentStory = () => {
  const [path, setPath] = React.useState('/reference/petstore/openapi.v1.yaml/paths/~1pets~1{petId}/get');

  const contextValue = React.useMemo(() => ({ path, setPath }), [path, setPath]);

  const contentsWithDynamicIsActive = React.useMemo(() => {
    return studioContents.map(c => ({ ...c, isActive: c.to === path }));
  }, [path]);

  return (
    <NavigationContext.Provider value={contextValue}>
      <div style={styles}>
        <TableOfContents className="h-full" contents={contentsWithDynamicIsActive} rowComponent={SimpleRowComponent} />
      </div>
    </NavigationContext.Provider>
  );
};

const CustomComponentWithExtraPropsStory = () => {
  const [path, setPath] = React.useState('/reference/petstore/openapi.v1.yaml/paths/~1pets~1{petId}/get');

  const contextValue = React.useMemo(() => ({ path, setPath }), [path, setPath]);

  const contentsWithDynamicIsActive = React.useMemo(() => {
    return studioContents.map(c => ({ ...c, isActive: c.to === path }));
  }, [path]);

  return (
    <NavigationContext.Provider value={contextValue}>
      <div style={styles}>
        <TableOfContents
          className="h-full"
          contents={contentsWithDynamicIsActive}
          rowComponent={RowComponentWithExtraProps}
          rowComponentExtraProps={{ helloString: 'Hello' }}
        />
      </div>
    </NavigationContext.Provider>
  );
};

const SimpleRowComponent: RowComponentType<ITableOfContentsLink> = ({ item, ...rest }) => {
  const { setPath } = React.useContext(NavigationContext);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (item.to) {
        setPath(item.to);
      }
      e.preventDefault();
    },
    [item.to, setPath],
  );

  return (
    <a href={item.to} onClick={handleClick}>
      <DefaultRow item={item} {...rest} />
    </a>
  );
};

type ExtraProps = {
  helloString: string;
};

const RowComponentWithExtraProps: RowComponentType<ITableOfContentsLink, ExtraProps> = ({
  item,
  extra: { helloString },
}) => {
  const { setPath } = React.useContext(NavigationContext);

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (item.to) {
        setPath(item.to);
      }
      e.preventDefault();
    },
    [item.to, setPath],
  );

  return (
    <Button onClick={handleClick} className="block mb-2 mt-2">
      <em>{helloString}</em> {item.name}
    </Button>
  );
};
