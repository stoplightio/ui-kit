import { Button, Drawer, InputGroup } from '@blueprintjs/core';
import cn from 'classnames';
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

export type ITableOfContentsLink = TableOfContentsItem & {
  to?: string;
  exact?: boolean;
  isExternalLink?: boolean;
};

export interface ITableOfContents<T extends TableOfContentsItem = TableOfContentsItem> {
  contents: T[];

  // Caller should return undefined if they don't want to provide custom elem
  rowRenderer?: (props: {
    item: T;
    key: number | string;
    getProps: typeof computeTableOfContentsItemProps;
    DefaultRow: React.FC<ITableOfContentsNode<T>>;
  }) => React.ReactElement | undefined;

  // Padding that will be used for (default: 10)
  padding?: string;
  className?: string;

  // force items to render with active or selected if either is true.
  // for example if forceStateStyle=active, then if an item isSelected or isActive is true, will render with active styling
  forceStateStyle?: 'active' | 'selected';

  // Title of project
  title?: string;

  // Controls for the drawer functionality on mobile
  isOpen?: boolean;
  onClose?: () => void;

  // Mobile breakpoint, default (true) is 786px, false disables Drawer
  enableDrawer?: boolean | number;

  withScroller?: boolean;

  // provide filter and onChangeFilter to enable filtering. this will render a filter input at the top of the TOC.
  filter?: string;
  onChangeFilter?: (filter: string) => void;
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
  rowRenderer,
  forceStateStyle,
}: Pick<ITableOfContents<T>, 'className' | 'contents' | 'rowRenderer' | 'forceStateStyle'>) {
  const [expanded, setExpanded] = React.useState({});

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

        const isGroup = item.type === 'group';
        const isDivider = item.type === 'divider';
        const isExpanded = expanded[index];
        const onClick = (e: React.MouseEvent) => {
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
          setExpanded({ ...expanded, [String(index)]: !isExpanded });
        };

        let elem;
        if (rowRenderer) {
          elem = rowRenderer({
            item,
            key: index,
            getProps: computeTableOfContentsItemProps,
            DefaultRow: props => (
              <TableOfContentsItemInner
                {...props}
                forceStateStyle={forceStateStyle}
                onClick={onClick}
                isExpanded={isExpanded}
              />
            ),
          });
        }

        if (!elem) {
          elem = (
            <div key={index} {...computeTableOfContentsItemProps({ item, onClick })}>
              <TableOfContentsItemInner
                key={index}
                item={item}
                forceStateStyle={forceStateStyle}
                onClick={onClick}
                isExpanded={isExpanded}
              />
            </div>
          );
        }

        return elem;
      })}
    </div>
  );
}

export function TableOfContents<T extends TableOfContentsItem = TableOfContentsItem>({
  className,
  padding = '4',
  title,
  isOpen = false,
  onClose = () => {},
  withScroller,
  filter,
  onChangeFilter,
  ...innerProps
}: ITableOfContents<T>) {
  useRenderWithScroll();

  const isMobile = false; // useIsMobile(enableDrawer);

  const hasFilter = filter !== undefined && onChangeFilter;

  const toc = <TableOfContentsInner className={cn(hasFilter ? `pb-${padding}` : `py-${padding}`)} {...innerProps} />;

  const containerClassName = cn('TableOfContents', className);
  const comp = (
    <>
      {hasFilter && (
        <InputGroup
          leftIcon="filter"
          placeholder="Filter..."
          className={`m-${padding}`}
          value={filter}
          autoFocus
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeFilter?.(event.currentTarget.value)}
        />
      )}

      <div className={containerClassName}>
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

interface ITableOfContentsNode<T extends TableOfContentsItem = TableOfContentsItem> {
  item: T;
  isSelected?: boolean;
  isActive?: boolean;
  forceStateStyle?: 'active' | 'selected';
  isExpanded?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<any, MouseEvent>) => void;
}

const computeTableOfContentsItemProps = ({
  item,
  isSelected: _isSelected,
  isActive: _isActive,
  onClick,
}: ITableOfContentsNode) => {
  const depth = item.depth || 0;
  const isChild = item.type !== 'group' && depth > 0;
  const isGroup = item.type === 'group';
  const isDivider = item.type === 'divider';
  const showSkeleton = item.showSkeleton;
  const isSelected = !showSkeleton && (_isSelected || item.isSelected);
  const isActive = !showSkeleton && (_isActive || item.isActive);

  return {
    onClick: showSkeleton ? undefined : onClick,
    className: cn('TableOfContentsItem border-transparent', item.className, {
      'border-l': !isGroup,
      'TableOfContentsItem--selected': isActive,
      'TableOfContentsItem--active': isSelected,
      'TableOfContentsItem--group': isGroup,
      'TableOfContentsItem--divider': isDivider,
      'TableOfContentsItem--child border-gray-3 dark:border-lighten-3': isChild,
    }),
    style: {
      marginLeft: depth * 15,
    },
  };
};

const TableOfContentsItemInner = ({
  item,
  isSelected: _isSelected,
  isActive: _isActive,
  isDisabled: _isDisabled,
  forceStateStyle,
  isExpanded,
}: ITableOfContentsNode) => {
  const isGroup = item.type === 'group';
  const isDivider = item.type === 'divider';
  const showSkeleton = item.showSkeleton;
  let isSelected = _isSelected || item.isSelected;
  let isActive = _isActive || item.isActive;
  const isDisabled = _isDisabled || item.isDisabled;

  let icon = item.icon;
  if (isActive || isSelected) {
    if (item.activeIcon) {
      icon = item.activeIcon;
    }

    if (forceStateStyle === 'active') {
      isActive = true;
      isSelected = false;
    } else if (forceStateStyle === 'selected') {
      isActive = false;
      isSelected = true;
    }
  }

  if (showSkeleton) {
    isActive = false;
    isSelected = false;
  }

  const className = cn(
    'TableOfContentsItem__inner relative flex flex-col justify-center border-transparent border-l-4',
    {
      'cursor-pointer': item.onClick && !showSkeleton && !isDisabled,
      'cursor-not-allowed': isDisabled,
      'dark-hover:bg-lighten-2 hover:bg-darken-2':
        !isDisabled && !isDivider && !isSelected && !isActive && !showSkeleton,
      'dark:text-white bg-darken-2 dark:bg-lighten-2': isSelected || isActive,
      'text-gray-7 dark:text-white': isActive,
      'border-primary text-blue-6': isSelected,

      'text-gray-6 dark:text-gray-6 tracking-wide text-sm font-semibold h-12': isDivider,
      'text-gray-6 dark:text-gray-5': !isDivider && !isSelected && !isActive,
    },
  );

  let loadingElem;
  if (item.isLoading) {
    loadingElem = <FAIcon icon={['far', 'spinner-third']} className="fa-spin text-gray-7 ml-2" />;
  }

  let actionElem;
  if (item.action) {
    actionElem = (
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
    );
  }

  return (
    <div className={cn('-ml-px', className, { 'opacity-75': isDisabled })}>
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
          <FAIcon className="TableOfContentsItem__icon" icon={isExpanded ? 'chevron-down' : 'chevron-right'} />
        )}
      </div>
      {item.footer}
    </div>
  );
};

/**
 * Traverses contents backwards to find the first index with a lower depth
 */
function findParentIndex(currentDepth: number, contents: TableOfContentsItem[]) {
  for (let index = contents.length - 1; index >= 0; index--) {
    if (contents[index].depth === currentDepth - 1) {
      return String(index);
    }
  }

  return -1;
}
