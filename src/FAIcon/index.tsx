import { IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import cn from 'classnames';
import * as React from 'react';

export type FAIconName = IconName;
export type FAIconTuple = [IconPrefix, FAIconName];
export type FAIconProp = FAIconName | FAIconTuple | IconLookup;

export interface IIcon {
  icon: FAIconProp;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x';
  style?: any;
}

export const FAIcon = ({ icon, className, size, style }: IIcon) => {
  let prefix: IconPrefix = 'fas';
  let name: FAIconName;

  if (isIconName(icon)) {
    name = icon;
  } else if (isIconTuple(icon)) {
    prefix = icon[0];
    name = icon[1];
  } else if (isIconLookup(icon)) {
    prefix = icon.prefix || prefix;
    name = icon.iconName;
  } else {
    // eslint-disable-next-line no-console
    console.warn('Invalid icon prop provided to Icon component', icon);
    name = 'exclamation';
  }

  return (
    <i
      className={cn(className, 'Icon', prefix, `fa-${name}`, {
        [`fa-${size}`]: size,
      })}
      style={style}
    />
  );
};

function isIconName(arg: any): arg is FAIconName {
  return typeof arg === 'string';
}

function isIconTuple(arg: any): arg is FAIconTuple {
  return Array.isArray(arg);
}

function isIconLookup(arg: any): arg is IconLookup {
  return arg && typeof arg === 'object' && arg.prefix && arg.iconName;
}
