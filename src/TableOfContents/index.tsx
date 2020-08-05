import { Button, Drawer } from '@blueprintjs/core';
import cn from 'classnames';
import { flatMap, range } from 'lodash';
import * as React from 'react';

import { FAIcon, FAIconProp } from '../FAIcon';
import { ScrollContainer } from '../ScrollContainer';

export type TableOfContentsItem = {
  name: React.ReactNode;
  className?: string;
  onClick?: () => void;
  depth?: number;
  isSelected?: boolean;
  isActive?: boolean;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  type?: 'divider' | 'group' | 'item';
  icon?: FAIconProp;
  activeIcon?: FAIconProp;
  iconColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  showSkeleton?: boolean;
  action?: {
    icon?: FAIconProp;
    name?: string;
    isActive?: boolean;
    onClick: any;
  };
};

export type SelectItem = {
  name: React.ReactNode;
  value: string;
  label?: string;
};

export type ITableOfContentsLink = TableOfContentsItem & {
  to?: string;
  exact?: boolean;
  isExternalLink?: boolean;
};

export type RowComponentProps<T extends TableOfContentsItem> = {
  item: T;
  index: number;
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export type RowComponentType<T extends TableOfContentsItem> = React.ComponentType<RowComponentProps<T>>;

export interface ITableOfContents<T extends TableOfContentsItem = TableOfContentsItem> {
  contents: T[];

  /**
   * Optionally customize how a row is rendered. Defaults to `DefaultRow`.
   */
  rowComponent?: RowComponentType<T>;

  // Padding that will be used for (default: 10)
  padding?: string;
  className?: string;

  /**
   * HTML data-test attribute to be set on the container div.
   */
  'data-test'?: string;

  // Title of project
  title?: string;

  // Controls for the drawer functionality on mobile
  isOpen?: boolean;
  onClose?: () => void;

  // Mobile breakpoint, default (true) is 786px, false disables Drawer
  enableDrawer?: boolean | number;

  withScroller?: boolean;
}

// This is to avoid "mismatch" when rendering during SSR, since we render without scroll container in SSR
let renderWithScroll = false;
const useRenderWithScroll = () => {
  const [, setTick] = React.useState(0);
  return React.useEffect(() => {
    if (!renderWithScroll) {
      renderWithScroll = true;
      setTick(1);
    }
  }, []);
};

function TableOfContentsInner<T extends TableOfContentsItem = TableOfContentsItem>({
  className,
  contents,
  rowComponent: RowComponent = DefaultRow,
}: Pick<ITableOfContents<T>, 'className' | 'contents' | 'rowComponent'>) {
  const [expanded, setExpanded] = React.useState({});

  // an array of functions. Invoking the N-th function toggles the expanded flag on the N-th content item
  const toggleExpandedFunctions = React.useMemo(() => {
    return range(contents.length).map(i => () =>
      setExpanded(current => ({
        ...current,
        [i]: !current[i],
      })),
    );
  }, [contents.length]);

  // expand ancestors of active items by default
  React.useEffect(() => {
    const activeItems = contents.filter(item => item.isActive);
    const itemsToExpand = flatMap(activeItems, item =>
      findAncestorIndices(item.depth ?? 0, contents.slice(0, contents.indexOf(item))),
    );
    setExpanded(current => ({
      ...current,
      ...Object.fromEntries(itemsToExpand.map(index => [index, true])),
    }));
  }, [contents]);

  return (
    <div className={className}>
      {contents.map((item, index) => {
        const depth = item.depth || 0;

        if (depth > 0) {
          // Check if we should show this item
          const parentIndex = findParentIndex(depth, contents.slice(0, index));
          if (parentIndex > -1 && !expanded[parentIndex]) {
            return null;
          }
        }

        const isExpanded = expanded[index];

        return (
          <RowComponent
            key={index}
            item={item}
            index={index}
            isExpanded={isExpanded}
            toggleExpanded={toggleExpandedFunctions[index]}
          />
        );
      })}
    </div>
  );
}

export function TableOfContents<T extends TableOfContentsItem = TableOfContentsItem>({
  className,
  'data-test': dataTest,
  padding = '4',
  title,
  isOpen = false,
  onClose = () => {},
  withScroller,
  ...innerProps
}: ITableOfContents<T>) {
  useRenderWithScroll();

  const isMobile = false; // useIsMobile(enableDrawer);

  const toc = <TableOfContentsInner className={cn(`py-${padding}`)} {...innerProps} />;

  const containerClassName = cn('TableOfContents', className);
  const comp = (
    <>
      <div className={containerClassName} data-test={dataTest}>
        {renderWithScroll && withScroller ? <ScrollContainer>{toc}</ScrollContainer> : toc}
      </div>
    </>
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
}

function DefaultRowImpl<T extends TableOfContentsItem>({ item, isExpanded, toggleExpanded }: RowComponentProps<T>) {
  const isGroup = item.type === 'group';
  const isChild = item.type !== 'group' && (item.depth ?? 0) > 0;
  const isDivider = item.type === 'divider';
  const showSkeleton = item.showSkeleton;
  const isSelected = item.isSelected && !showSkeleton;
  const isActive = item.isActive && !showSkeleton;
  const isDisabled = item.isDisabled;

  const holderCallbackRef = React.useCallback((e: HTMLDivElement) => {
    if (e && isActive) {
      e.scrollIntoView({ block: 'center' });
    }
    // we only want this on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let icon = item.icon;
  if (item.activeIcon && (isActive || isSelected)) {
    icon = item.activeIcon;
  }

  const onClick = showSkeleton
    ? undefined
    : (e: React.MouseEvent) => {
        if (item.isDisabled) {
          e.preventDefault();
          return;
        }
        if (item.onClick) {
          item.onClick();
        }

        if (isDivider) {
          e.preventDefault();
          return;
        }

        if (!isGroup) return;

        e.preventDefault();
        toggleExpanded();
      };

  const outerClassName = cn('TableOfContentsItem border-transparent', item.className, {
    'border-l': !isGroup,
    'TableOfContentsItem--selected': isActive,
    'TableOfContentsItem--active': isSelected,
    'TableOfContentsItem--group': isGroup,
    'TableOfContentsItem--divider': isDivider,
    'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
  });

  const innerClassName = cn(
    'TableOfContentsItem__inner relative flex flex-col justify-center border-transparent border-l-4',
    {
      'cursor-pointer': onClick && !isDisabled,
      'cursor-not-allowed': isDisabled,
      'dark-hover:bg-lighten-2 hover:bg-darken-2':
        !isDisabled && !isDivider && !isSelected && !isActive && !showSkeleton,
      'dark:text-white bg-darken-2 dark:bg-lighten-2': isSelected || isActive,
      'text-gray-7 dark:text-white': isActive,
      'border-primary text-blue-6': isSelected,
      'text-gray-6 dark:text-gray-6 font-semibold h-10': isDivider,
      'text-gray-5 dark:text-gray-5 hover:text-gray-6': !isDivider && !isSelected && !isActive,
    },
  );

  const loadingElem = item.isLoading ? (
    <FAIcon icon={['far', 'spinner-third']} className="fa-spin text-gray-7 ml-2" />
  ) : null;

  const actionElem = item.action ? (
    <Button
      icon={
        item.action.icon ? (
          <FAIcon icon={item.action.icon} className={cn({ 'text-gray-5': !item.action.isActive })} />
        ) : undefined
      }
      text={item.action.name}
      onClick={showSkeleton ? undefined : item.action.onClick}
      active={item.action.isActive}
      intent={item.action.isActive ? 'primary' : undefined}
      className="ml-2"
      minimal
      small
    />
  ) : null;

  return (
    <div
      onClick={onClick}
      className={outerClassName}
      style={{ marginLeft: (item.depth ?? 0) * 20 }}
      ref={holderCallbackRef}
    >
      <div className={cn('-ml-px', innerClassName, { 'opacity-75': isDisabled })}>
        <div className="flex flex-row items-center">
          {icon && (
            <FAIcon
              className={cn('mr-3 fa-fw', { 'text-blue-6': isSelected, 'bp3-skeleton': item.showSkeleton })}
              icon={icon}
            />
          )}

          <span className={cn('TableOfContentsItem__name flex-1 truncate', { 'bp3-skeleton': item.showSkeleton })}>
            {item.name}
          </span>

          {item.meta && <span className="text-sm text-left text-gray font-medium">{item.meta}</span>}
          {loadingElem}
          {actionElem}
          {isGroup && (
            <FAIcon
              className="TableOfContentsItem__icon"
              icon={['far', isExpanded ? 'chevron-down' : 'chevron-right']}
            />
          )}
        </div>
        {item.footer}
      </div>
    </div>
  );
}
DefaultRowImpl.displayName = 'DefaultRow';

export const DefaultRow = React.memo(DefaultRowImpl);

/**
 * Traverses contents backwards to find the first index with a lower depth
 */
function findParentIndex(currentDepth: number, contents: TableOfContentsItem[]): number {
  for (let index = contents.length - 1; index >= 0; index--) {
    if (contents[index].depth === currentDepth - 1) {
      return index;
    }
  }

  return -1;
}

function findAncestorIndices(currentDepth: number, precedingContents: TableOfContentsItem[]): number[] {
  const parentIndex = findParentIndex(currentDepth, precedingContents);
  if (parentIndex === -1) {
    return [];
  }

  return [
    ...findAncestorIndices(precedingContents[parentIndex].depth ?? 0, precedingContents.slice(0, parentIndex)),
    parentIndex,
  ];
}
