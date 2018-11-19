import * as React from 'react';
import { List, ListRowProps, ListRowRenderer } from 'react-virtualized';

import { Box, IBoxProps } from './Box';

import { themeGet } from 'styled-system';
import { styled } from './utils';

export interface IListScrollerItemProps {
  key: string;
  index: number;
  value: any;
}

export interface IListScrollerProps extends IBoxProps {
  className?: string;
  listHeight: number | (() => number);
  listWidth: number;
  rowHeight: number;
  scrollToIndex?: number;
  list: any[];
  renderRow: ({ key, index, value }: IListScrollerItemProps) => JSX.Element;
}

const ListView = (props: IListScrollerProps) => {
  const { className, list, listWidth, listHeight, rowHeight, scrollToIndex, renderRow } = props;

  const rowRenderer = ({ key, index }: ListRowProps) => renderRow({ key, index, value: list[index] });

  return (
    <List
      className={className}
      height={typeof listHeight === 'function' ? listHeight() : listHeight}
      rowHeight={rowHeight}
      rowCount={list.length}
      scrollToIndex={scrollToIndex}
      rowRenderer={rowRenderer as ListRowRenderer}
      width={listWidth}
    />
  );
};

export const ListScroller = styled<IListScrollerProps, 'div'>(Box as any).attrs({
  as: () => ListView,
})`
  ::-webkit-scrollbar {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: ${themeGet('scrollbars.thumb', '#000')};
    border-radius: ${themeGet('scrollbars.thumbRadius', '0')};
  }
`;
