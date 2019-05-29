import { Omit } from '@stoplight/types';
import * as React from 'react';
import { Menu, MenuItem } from '..';
import { FixedSizeList } from '../ScrollList';
import { ISelectProps, ItemListRenderer, ItemRenderer, Select } from '../Select';

export interface IDropdown extends Omit<ISelectProps<string>, 'itemRenderer'> {
  baseComponent: new (props: ISelectProps<string>) => Select<string>;
  itemRenderer?: ISelectProps<string>['itemRenderer'];
}

export const Dropdown: React.FunctionComponent<IDropdown> = ({
  children,
  baseComponent,
  items,
  activeItem,
  ...props
}) => {
  return React.createElement(
    baseComponent as React.ComponentClass<ISelectProps<string>>,
    {
      filterable: false,
      items,
      itemRenderer,
      itemListRenderer,
      popoverProps: { portalClassName: 'Dropdown__popover', ...props.popoverProps },
      ...props,
    },
    children
  );
};
Dropdown.displayName = 'Dropdown';

const itemRenderer: ItemRenderer<string> = (value, { handleClick, modifiers }) => (
  <MenuItem active={modifiers.active} key={value} onClick={handleClick} text={value} />
);

const itemListRenderer: ItemListRenderer<string> = ({ filteredItems, renderItem }) => {
  return (
    <Menu className="Dropdown__select">
      <FixedSizeList
        maxRows={10}
        itemSize={30}
        itemCount={filteredItems.length}
        itemData={{ filteredItems, renderItem }}
      >
        {Item}
      </FixedSizeList>
    </Menu>
  );
};

const Item = (props: any) => {
  const { data, index, style } = props;
  const { filteredItems, renderItem } = data;

  return (
    <div key={index} style={style}>
      {renderItem(filteredItems[index])}
    </div>
  );
};
