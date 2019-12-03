import { Button, Drawer, Icon } from '@blueprintjs/core';
import cn from 'classnames';
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
  contents: _contents,
  rowRenderer,
  className,
  padding = '10',
  title,
  isOpen = false,
  // tslint:disable-next-line: no-empty
  onClose = () => {},
  enableDrawer = true,
}) => {
  const contents = _contents;

  const [expanded, setExpanded] = React.useState({});

  const isMobile = useIsMobile(enableDrawer);

  const comp = (
    <div className={cn('TableOfContents bg-gray-1 dark:bg-transparent flex justify-end h-full', className)}>
      <div className="w-full">
        <ScrollContainer>
          <div className={cn('TableOfContents__inner ml-auto', `py-${padding}`)}>
            {contents.map((item, index) => {
              if (item.depth > 0) {
                // Check if we should show this item
                const parentIndex = findParentIndex(item.depth, contents.slice(0, index));
                if (parentIndex > -1 && !expanded[parentIndex]) {
                  return null;
                }
              }

              const isGroup = item.type === 'group';
              const isDivider = item.type === 'divider';
              const isExpanded = expanded[index];
              const onClick = (e: React.MouseEvent) => {
                if (isDivider) {
                  e.preventDefault();
                  return;
                }

                if (!isGroup) return;

                e.preventDefault();
                setExpanded({ ...expanded, [String(index)]: !isExpanded });
              };

              if (rowRenderer) {
                return rowRenderer(item, props => (
                  <TableOfContentsItem {...props} onClick={onClick} isExpanded={isExpanded} />
                ));
              } else {
                return <TableOfContentsItem key={index} item={item} onClick={onClick} isExpanded={isExpanded} />;
              }
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
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TableOfContentsItem: React.FunctionComponent<ITableOfContentsItem> = ({ item, isExpanded, onClick }) => {
  const isChild = item.type !== 'group' && item.depth > 0;
  const isGroup = item.type === 'group';
  const isDivider = item.type === 'divider';
  const isActive = item.isActive;

  const className = cn('TableOfContentsItem__inner relative flex items-center border border-transparent border-r-0', {
    'dark-hover:bg-lighten-2 hover:bg-darken-2 cursor-pointer': !isDivider,
    'text-gray-5 dark:text-gray-5': isDivider || (isChild && !isActive),
    'text-primary bg-white border-darken-3 dark:bg-lighten-2 dark:border-lighten-4': isActive,
    'dark:text-white': !isDivider && !isChild && !isActive,
  });

  return (
    <div
      className={cn('TableOfContentsItem border-transparent', {
        'border-l': !isActive && !isGroup,
        'TableOfContentsItem--active': isActive,
        'TableOfContentsItem--group': isGroup,
        'TableOfContentsItem--divider': isDivider,
        'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
      })}
      style={{
        marginLeft: item.depth * 16,
      }}
      onClick={onClick}
    >
      <div className={cn('-ml-px', className)}>
        {item.icon && <Icon className="mr-3" icon={item.icon} iconSize={12} />}
        <span className="TableOfContentsItem__name flex-1 truncate">{item.name}</span>
        {item.meta && <span className="text-sm text-left text-gray font-medium">v{item.meta}</span>}
        {isGroup && <Icon className="TableOfContentsItem__icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />}
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
      return String(index);
    }
  }

  return -1;
}
