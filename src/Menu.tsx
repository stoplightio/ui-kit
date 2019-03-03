import * as React from 'react';

import { Box, IBoxCSS } from './Box';
import { Flex, IFlex } from './Flex';
import { useHover } from './hooks/useHover';
import { Icon, IIcon } from './Icon';
import { ITheme, useTheme } from './theme';

// TODO allow dividers in the menu

/**
 * MENU
 */

export declare type RenderMenuItemFunc = (item: IMenuItem, index: number, items: IMenuItem[]) => React.ReactNode;
export declare type RenderMenuFunc = (
  css: IFlex['css'],
  menuItems: IMenuItem[],
  renderMenuItem: RenderMenuItemFunc
) => React.ReactNode;

const defaultRenderMenuItem: RenderMenuItemFunc = (item: IMenuItem, index: number) => {
  return <MenuItem key={index} {...item} />;
};

const defaultRenderMenu: RenderMenuFunc = (styles, menuItems, renderMenuItem) => {
  return (
    <Flex css={styles} key="menu-items">
      {menuItems.map(renderMenuItem)}
    </Flex>
  );
};

export interface IMenu extends IFlex {
  menuItems: IMenuItem[];
  renderTrigger?: (isShown: boolean) => React.ReactNode;
  renderMenuItem?: RenderMenuItemFunc;
  hideDelay?: number;
  posY?: 'top' | 'bottom';
  posX?: 'left' | 'right' | 'center';
  offset?: {
    x?: number;
    y?: number;
  };
}

export const Menu: React.FunctionComponent<IMenu> = React.forwardRef<HTMLOrSVGElement, IMenu>((props, ref) => {
  const {
    menuItems,
    posX = 'center',
    posY = 'bottom',
    offset,
    renderTrigger,
    renderMenuItem = defaultRenderMenuItem,
    renderMenu = defaultRenderMenu,
    hideDelay = 200,
    key,
    ...rest
  } = props;

  const { menu: theme } = useTheme();

  const [isShown, handlers] = useHover(false, props, hideDelay);

  const styles = menuStyles();
  const listStyles = menuListStyles(theme, {
    posX,
    posY,
    offset,
    hasTrigger: !!renderTrigger,
  });

  return (
    <Box key={key} ref={ref} css={styles} {...rest} {...handlers}>
      {renderTrigger && renderTrigger(isShown)}
      {(!renderTrigger || isShown) && renderMenu(listStyles, menuItems, renderMenuItem)}
    </Box>
  );
});

export const menuListStyles = (
  theme: ITheme['menu'],
  { hasTrigger, posX, posY, offset }: Partial<IMenu> & { hasTrigger: boolean }
) => {
  return [
    {
      flexDirection: 'column',
      color: theme.fg,
      backgroundColor: theme.bg,
      border: `1px solid ${theme.border}`,
      borderRadius: '4px',
      zIndex: 10000,
      position: hasTrigger ? 'absolute' : 'relative',
      margin: offset && `${offset.y || 0}px ${offset.x || 0}px`,
    },
    posY === 'bottom' ? { top: '100%' } : { bottom: '100%' },
    posX === 'center' && {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    posX === 'left' && { right: '100%' },
    posX === 'right' && { left: '100%' },
  ];
};

export const menuStyles = (): IBoxCSS => {
  return [
    {
      display: 'inline-flex',
      position: 'relative',
      width: 'auto',
      overflow: 'visible',
      whiteSpace: 'nowrap',
    },
  ];
};
/**
 * MENU ITEM
 */

export interface IMenuItem extends Pick<IFlex, Exclude<keyof IFlex, 'title'>> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: IIcon['icon'];
  disabled?: boolean;
  onClick?: IFlex['onClick'];
}

export const MenuItem: React.FunctionComponent<IMenuItem> = React.forwardRef<HTMLOrSVGElement, IMenuItem>(
  (props, ref) => {
    const { icon, title, subtitle, onClick, disabled, ...rest } = props;

    const { menu: theme } = useTheme();
    const styles = menuItemStyles(theme, { disabled, onClick });

    return (
      <Flex {...rest} ref={ref} onClick={onClick} css={styles}>
        {icon && (
          <Flex
            key="menu-icon"
            alignItems="center"
            justifyContent="center"
            width="20px"
            pr={title || subtitle ? 10 : 0}
          >
            <Icon icon={icon} />
          </Flex>
        )}
        {(title || subtitle) && (
          <span key="menu-title">
            {title && <span>{title}</span>}
            {subtitle && <span>{subtitle}</span>}
          </span>
        )}
      </Flex>
    );
  }
);

const menuItemStyles = (theme: ITheme['menu'], { disabled, onClick }: Partial<IMenuItem>): IBoxCSS => {
  return [
    {
      alignItems: 'center',
      padding: '6px 10px',
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : 1,

      ':hover': {
        backgroundColor: theme.hoverBg,
      },
    },
  ];
};
