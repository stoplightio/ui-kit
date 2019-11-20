import { Button, Drawer, Icon } from '@blueprintjs/core';
import cn from 'classnames';
import { get, noop } from 'lodash';
import * as React from 'react';

import { useIsMobile } from '../_hooks/useIsMobile';
import { ScrollContainer } from '../ScrollContainer';
import { IContentsNode } from './types';

export interface ITableOfContents {
  contents: IContentsNode[];
  rowRenderer?: (item: IContentsNode, DefaultRow: React.FC<ITableOfContentsItem>) => React.ReactElement;

  // Padding that will be used for (default: 10)
  padding?: string;
  className?: string;

  // Title of project
  title?: string;

  // Controls for the drawer functionality on mobile
  isOpen?: boolean;
  onClose?: () => void;

  // Mobile breakpoint, default (true) is 786px, false disables Drawer
  enableDrawer?: boolean | number;
}

export const TableOfContents: React.FunctionComponent<ITableOfContents> = ({
  className,
  padding = '10',
  title,
  contents,
  onClose = noop,
  isOpen = false,
  enableDrawer = true,
  rowRenderer = (item, DefaultRow) => <DefaultRow item={item} />,
}) => {
  const [expanded, setExpanded] = React.useState({});

  const isMobile = useIsMobile(enableDrawer);

  const comp = (
    <div className={cn('TableOfContents bg-gray-1 dark:bg-transparent flex justify-end h-full', className)}>
      <div className="w-full">
        <ScrollContainer>
          <div className={cn('TableOfContents__inner ml-auto', `py-${padding}`)}>
            {contents.map((item, index) => {
              // Check if we should show this item
              if (item.depth > 0) {
                const parentIndex = findParentIndex(item.depth, contents.slice(0, index));
                if (parentIndex > -1 && !expanded[parentIndex]) {
                  return null;
                }
              }

              const isExpanded = expanded[index];
              const hasChildren = item.depth > get(contents[index + 1], 'depth');

              return rowRenderer(item, props => (
                <TableOfContentsItem
                  key={index}
                  item={item}
                  isExpanded={isExpanded}
                  hasChildren={hasChildren}
                  {...props}
                  onClick={(e: React.MouseEvent) => {
                    if (item.disabled) {
                      e.preventDefault();
                      return;
                    }

                    if (item.onClick) {
                      item.onClick(e);
                    }

                    if (hasChildren) {
                      setExpanded({ ...expanded, [index]: !isExpanded });
                    }
                  }}
                />
              ));
            })}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={() => onClose()} position="left" size="330px">
        <div className="flex flex-1 flex-col bg-gray-1 dark:bg-transparent">
          <div className="border-b dark:border-lighten-4 h-20 py-6 px-2 bg-white">
            <Button className="flex justify-start text-lg" icon={'arrow-left'} minimal onClick={() => onClose()}>
              {title}
            </Button>
          </div>
          <div className="h-full flex justify-end">{comp}</div>
        </div>
      </Drawer>
    );
  }

  return comp;
};

interface ITableOfContentsItem {
  item: IContentsNode;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TableOfContentsItem: React.FunctionComponent<ITableOfContentsItem> = ({
  item,
  onClick,
  isExpanded,
  hasChildren,
}) => {
  const isChild = item.depth > 0;
  const isDivider = item.type === 'divider';
  const isActive = item.isActive;
  const isDisabled = item.disabled;

  const className = cn(
    'TableOfContentsItem__inner relative flex items-center',
    isDisabled
      ? 'cursor-disabled text-gray-4'
      : {
          'text-gray-5': isDivider || (isChild && !isActive),
          'dark:text-white': !isDivider && !isChild && !isActive,
          'dark-hover:bg-lighten-2 hover:bg-darken-2 cursor-pointer': item.onClick || item.href,
          'text-primary bg-white border-darken-3 dark:bg-lighten-2 dark:border-lighten-4': isActive,
        },
  );

  return (
    <div
      className={cn('TableOfContentsItem', {
        'TableOfContentsItem--active': isActive,
        'TableOfContentsItem--divider': isDivider,
        'TableOfContentsItem--child': isChild,
      })}
      style={{
        marginLeft: item.depth * 16,
      }}
      onClick={onClick}
    >
      <div className={cn('-ml-px', className)}>
        {item.icon && <Icon className="mr-3" icon={item.icon} iconSize={12} />}
        <span className="TableOfContentsItem__name flex-1 truncate">{item.name}</span>
        {hasChildren && (
          <Icon className="TableOfContentsItem__icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />
        )}
      </div>
    </div>
  );
};

/**
 * Traverses contents backwards to find the first index with a lower depth
 */
function findParentIndex(currentDepth: number, contents: IContentsNode[]) {
  for (let index = contents.length - 1; index >= 0; index--) {
    if (contents[index].depth === currentDepth - 1) {
      return index;
    }
  }

  return -1;
}
