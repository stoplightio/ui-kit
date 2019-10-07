import { Button, Drawer, Icon, IconName } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { useIsMobile } from '../_hooks/useIsMobile';
import { ComponentsContext } from '../Provider';
import { ScrollContainer } from '../ScrollContainer';
import { IContentsNode } from '../types';
import { deserializeSrn } from '../utils';

export interface ITableOfContents {
  // Precomputed list of nodes instead of items. This is useful if you want to customize the ordering of the tree.
  contents: IContentsNode[];

  // SRN of the active node
  srn?: string;

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
  srn,
  className,
  padding = '10',
  title,
  isOpen = false,
  // tslint:disable-next-line: no-empty
  onClose = () => {},
  enableDrawer = true,
}) => {
  const contents = _contents;

  // TODO (CL): Should we store expanded state in local storage?
  const [expanded, setExpanded] = React.useState({});

  // Whenever the SRN changes, make sure the parent is expanded
  // TODO (CL): Handle deeply nested expanding
  React.useEffect(() => {
    if (!srn) return;

    // Get the index of the currently active item
    const index = contents.findIndex(item => item.isActive);
    if (index === -1 || !contents[index] || contents[index].depth === 0) return;

    const parentIndex = findParentIndex(contents[index].depth, contents.slice(0, index));
    if (parentIndex > -1 && !expanded[parentIndex]) {
      setExpanded({ ...expanded, [parentIndex]: true });
    }
  }, [srn]);

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

              return (
                <TableOfContentsItem
                  key={index}
                  name={item.name}
                  // srn={item.srn}
                  depth={item.depth}
                  isActive={item.isActive || false}
                  isGroup={isGroup}
                  isExpanded={isExpanded}
                  isDivider={isDivider}
                  onClick={e => {
                    if (isDivider) {
                      e.preventDefault();
                      return;
                    }

                    if (!isGroup) return;

                    e.preventDefault();
                    setExpanded({ ...expanded, [String(index)]: !isExpanded });
                  }}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );

  if (isMobile) {
    const { org, project } = deserializeSrn(srn || '');
    return (
      <Drawer isOpen={isOpen} onClose={() => onClose()} position="left" size="330px">
        <div className="flex flex-1 flex-col bg-gray-1 dark:bg-transparent">
          <div className="border-b dark:border-lighten-4 h-20 py-6 px-2 bg-white">
            <Button className="flex justify-start text-lg" icon={'arrow-left'} minimal onClick={() => onClose()}>
              {title || `${org} / ${project}`}
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
  depth: number;
  name: string;
  srn?: string;
  isActive: boolean;
  isGroup: boolean;
  isExpanded: boolean;
  isDivider: boolean;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  icon?: IconName;
}
const TableOfContentsItem: React.FunctionComponent<ITableOfContentsItem> = ({
  depth,
  name,
  srn,
  isActive,
  isGroup,
  isExpanded,
  isDivider,
  onClick,
  icon,
}) => {
  const Components = React.useContext(ComponentsContext);
  const href = !isGroup && !isDivider && srn;
  const isChild = !isGroup && depth > 0;

  const className = cn('TableOfContentsItem__inner relative flex items-center border border-transparent border-r-0', {
    'dark-hover:bg-lighten-2 hover:bg-darken-2 cursor-pointer': !isDivider,
    'text-gray-5 dark:text-gray-5': isDivider || (isChild && !isActive),
    'text-primary bg-white border-darken-3 dark:bg-lighten-2 dark:border-lighten-4': isActive,
    'dark:text-white': !isDivider && !isChild && !isActive,
  });

  const children: any = (
    <>
      {icon && <Icon iconSize={12} icon={icon} />}
      <div className="TableOfContentsItem__name flex-1 truncate px-2">{name}</div>
      {isGroup && <Icon className="TableOfContentsItem__icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />}
    </>
  );

  let item;
  if (href && Components && Components.link) {
    item = Components.link(
      {
        node: { url: href, title: name, className },
        children,
        parent: null,
        path: [],
        defaultComponents: {},
      },
      srn || name,
    );
  } else if (isDivider) {
    item = <div className={className}>{children}</div>;
  } else {
    item = (
      <a className={cn(className, 'flex-1')} href={href || ''}>
        {children}
      </a>
    );
  }

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
        marginLeft: depth * 16,
      }}
      onClick={onClick}
    >
      {item}
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
