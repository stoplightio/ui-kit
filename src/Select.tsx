// import { get } from 'lodash';
import get = require('lodash/get');
import * as React from 'react';
import { withTheme } from 'styled-components';

import ReactSelect from 'react-select';
import { Props } from 'react-select/lib/Select';

import { IThemeInterface } from './types';

// renamed some props from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-select/lib/Select.d.ts
// @ts-ignore
interface ISelectProps extends Partial<Props<ISelectOption>> {
  loading?: boolean; // isLoading
  disabled?: boolean; // isDisabled
  multi?: boolean; // isMulti
  clearable?: boolean; // isClearable

  searchable?: boolean; // isSearchable
  searchValue?: string; // inputValue

  isOpen?: boolean; // menuIsOpen

  onOpen?: () => void; // onMenuOpen
  onClose?: () => void; // onMenuClose
  onSearch?: (value: string) => void; // onInputChange
  onScrollToTop?: (event: React.SyntheticEvent<HTMLElement>) => void; // onMenuScrollToTop
  onScrollToBottom?: (event: React.SyntheticEvent<HTMLElement>) => void; // onMenuScrollToBottom

  loadingMessage?: string;
  noOptionsMessage?: string;

  blurOnSelect?: boolean; // blurInputOnSelect
  closeOnSelect?: boolean;
  closeOnScroll?: boolean;

  theme: IThemeInterface;
}

interface ISelectOption {
  label: string;
  value: any;
}

export const SelectBase = (props: ISelectProps) => {
  const {
    multi,
    loading,
    disabled,
    clearable,
    searchable,
    searchValue,
    isOpen,

    onOpen,
    onClose,
    onSearch,
    onScrollToTop,
    onScrollToBottom,

    blurOnSelect = !props.multi,
    closeOnSelect = !props.multi,
    closeOnScroll = false,

    loadingMessage = 'Loading...',
    noOptionsMessage = 'No Options',

    theme: providerTheme,

    ...selectProps
  } = props;

  return (
    <ReactSelect
      blurInputOnSelect={blurOnSelect}
      closeMenuOnSelect={closeOnSelect}
      closeMenuOnScroll={closeOnScroll}
      inputValue={searchValue}
      isClearable={clearable}
      isDisabled={disabled}
      isLoading={loading}
      isMulti={multi}
      menuIsOpen={isOpen}
      isSearchable={searchable}
      loadingMessage={() => loadingMessage}
      noOptionsMessage={() => noOptionsMessage}
      onInputChange={onSearch}
      onMenuOpen={onOpen}
      onMenuClose={onClose}
      onMenuScrollToTop={onScrollToTop}
      onMenuScrollToBottom={onScrollToBottom}
      {...selectProps}
      // CUSTOM STYLES
      styles={customStyles(providerTheme)}
    />
  );
};

export const Select = withTheme(SelectBase);

/**
 * Component styles copied from React-Select
 * removed most of the non-color, spacing, border related styles
 * override color related
 */

const customStyles = (theme: IThemeInterface) => {
  const selectTheme = get(theme, 'components.select', {});
  const chipTheme = get(selectTheme, 'chip', {});
  const menuTheme = get(selectTheme, 'menu', {});
  const indicatorsTheme = get(selectTheme, 'indicator', {});

  return {
    clearIndicator: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: indicatorsTheme.fg,

      ':hover': {
        color: indicatorsTheme.fg,
        opacity: !isDisabled && 0.6,
      },
    }),
    container: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      pointerEvents: null,
    }),
    control: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: selectTheme.fg,
      backgroundColor: selectTheme.bg,
      borderColor: selectTheme.border,

      boxShadow: null,
      outline: '0 !important',

      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled && 0.6,

      ':hover': {
        borderColor: selectTheme.border,
      },
    }),
    dropdownIndicator: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: indicatorsTheme.fg,

      ':hover': {
        color: indicatorsTheme.fg,
        opacity: !isDisabled && 0.6,
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: indicatorsTheme.fg,
    }),
    input: (provided: any, { isDisabled }: { isDisabled: false }) => ({
      ...provided,
      color: selectTheme.fg,
      backgroundColor: selectTheme.bg,

      cursor: isDisabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: indicatorsTheme.fg,
    }),
    loadingMessage: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
    }),
    menu: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
      backgroundColor: menuTheme.bg,
    }),
    multiValue: (provided: any) => ({
      ...provided,
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,

      ':hover': {
        color: chipTheme.fg,
        backgroundColor: chipTheme.bg,
      },
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
    }),
    option: (
      provided: any,
      { isFocused, isMulti, isSelected }: { isFocused: boolean; isMulti: boolean; isSelected: boolean }
    ) => ({
      ...provided,
      cursor: isMulti || !isSelected ? 'pointer' : 'default',

      // isFocus for somereason points to an internal hover state
      color: isSelected ? menuTheme.selectedfg : isFocused ? menuTheme.hoverfg : 'inherit',
      backgroundColor: isSelected ? menuTheme.selectedbg : isFocused ? menuTheme.hoverbg : 'transparent',

      // provide some affordance on touch devices
      ':active': {
        color: isSelected ? menuTheme.selectedbg : menuTheme.activebfg,
        backgroundColor: isSelected ? menuTheme.selectedbg : menuTheme.activebg,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: selectTheme.fg,

      opacity: 0.6,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: selectTheme.fg,
    }),
  };
};

/**
 * React-Select Styles
 * Copied over the styles from each component that are overridable, this will serve as a quick reference to what is actually being applied on the components by default
 */

// const ReactSelectStyles = {
//   clearIndicator: {
//     color: isFocused ? colors.neutral60 : colors.neutral20,
//     display: 'flex',
//     padding: baseUnit * 2,
//     transition: 'color 150ms',

//     ':hover': {
//       color: isFocused ? colors.neutral80 : colors.neutral40,
//     },
//   },

//   container: {
//     direction: isRtl ? 'rtl' : null,
//     pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
//     position: 'relative',
//   },

//   control: {
//     alignItems: 'center',
//     backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
//     borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
//     borderRadius: borderRadius,
//     borderStyle: 'solid',
//     borderWidth: 1,
//     boxShadow: isFocused ? `0 0 0 1px ${colors.primary}` : null,
//     cursor: 'default',
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     minHeight: spacing.controlHeight,
//     outline: '0 !important',
//     position: 'relative',
//     transition: 'all 100ms',

//     '&:hover': {
//       borderColor: isFocused ? colors.primary : colors.neutral30,
//     },
//   },

//   dropdownIndicator: {
//     color: isFocused ? colors.neutral60 : colors.neutral20,
//     display: 'flex',
//     padding: baseUnit * 2,
//     transition: 'color 150ms',

//     ':hover': {
//       color: isFocused ? colors.neutral80 : colors.neutral40,
//     },
//   },

//   group: {
//     paddingBottom: spacing.baseUnit * 2,
//     paddingTop: spacing.baseUnit * 2,
//   },

//   groupHeading: {
//     color: '#999',
//     cursor: 'default',
//     display: 'block',
//     fontSize: '75%',
//     fontWeight: '500',
//     marginBottom: '0.25em',
//     paddingLeft: spacing.baseUnit * 3,
//     paddingRight: spacing.baseUnit * 3,
//     textTransform: 'uppercase',
//   },

//   indicatorsContainer: {
//     alignItems: 'center',
//     alignSelf: 'stretch',
//     display: 'flex',
//     flexShrink: 0,
//   },

//   indicatorSeparator: {
//     alignSelf: 'stretch',
//     backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
//     marginBottom: baseUnit * 2,
//     marginTop: baseUnit * 2,
//     width: 1,
//   },

//   input: {
//     margin: spacing.baseUnit / 2,
//     paddingBottom: spacing.baseUnit / 2,
//     paddingTop: spacing.baseUnit / 2,
//     visibility: isDisabled ? 'hidden' : 'visible',
//     color: colors.neutral80,
//   },

//   loadingIndicator: {
//     color: isFocused ? colors.neutral60 : colors.neutral20,
//     display: 'flex',
//     padding: baseUnit * 2,
//     transition: 'color 150ms',
//     alignSelf: 'center',
//     fontSize: size,
//     lineHeight: 1,
//     marginRight: size,
//     textAlign: 'center',
//     verticalAlign: 'middle',
//   },

//   loadingMessage: {
//     color: colors.neutral40,
//     padding: `${baseUnit * 2}px ${baseUnit * 3}px`,
//     textAlign: 'center',
//   },

//   menu: {
//     [alignToControl(placement)]: '100%',
//     backgroundColor: colors.neutral0,
//     borderRadius: borderRadius,
//     boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
//     marginBottom: spacing.menuGutter,
//     marginTop: spacing.menuGutter,
//     position: 'absolute',
//     width: '100%',
//     zIndex: 1,
//   },

//   menuList: {
//     maxHeight,
//     overflowY: 'auto',
//     paddingBottom: baseUnit,
//     paddingTop: baseUnit,
//     position: 'relative', // required for offset[Height, Top] > keyboard scroll
//     WebkitOverflowScrolling: 'touch',
//   },

//   menuPortal: {},
//   multiValue: {
//     backgroundColor: colors.neutral10,
//     borderRadius: borderRadius / 2,
//     display: 'flex',
//     margin: spacing.baseUnit / 2,
//     minWidth: 0, // resolves flex/text-overflow bug
//   },

//   multiValueLabel: {
//     borderRadius: borderRadius / 2,
//     color: colors.neutral80,
//     fontSize: '85%',
//     overflow: 'hidden',
//     padding: 3,
//     paddingLeft: 6,
//     textOverflow: cropWithEllipsis ? 'ellipsis' : null,
//     whiteSpace: 'nowrap',
//   },

//   multiValueRemove: {
//     borderRadius: borderRadius / 2,
//     color: colors.neutral80,
//     fontSize: '85%',
//     overflow: 'hidden',
//     padding: 3,
//     paddingLeft: 6,
//     textOverflow: cropWithEllipsis ? 'ellipsis' : null,
//     whiteSpace: 'nowrap',
//   },

//   noOptionsMessage: {
//     color: colors.neutral40,
//     padding: `${baseUnit * 2}px ${baseUnit * 3}px`,
//     textAlign: 'center',
//   },

//   option: {
//     backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
//     color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
//     cursor: 'default',
//     display: 'block',
//     fontSize: 'inherit',
//     padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
//     width: '100%',
//     userSelect: 'none',
//     WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

//     // provide some affordance on touch devices
//     ':active': {
//       backgroundColor: isSelected ? colors.primary : colors.primary50,
//     },
//   },

//   placeholder: {
//     color: colors.neutral50,
//     marginLeft: spacing.baseUnit / 2,
//     marginRight: spacing.baseUnit / 2,
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//   },

//   singleValue: {
//     color: isDisabled ? colors.neutral40 : colors.neutral80,
//     marginLeft: spacing.baseUnit / 2,
//     marginRight: spacing.baseUnit / 2,
//     maxWidth: `calc(100% - ${spacing.baseUnit * 2}px)`,
//     overflow: 'hidden',
//     position: 'absolute',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     top: '50%',
//     transform: 'translateY(-50%)',
//   },

//   valueContainer: {
//     alignItems: 'center',
//     display: 'flex',
//     flex: 1,
//     flexWrap: 'wrap',
//     padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
//     WebkitOverflowScrolling: 'touch',
//     position: 'relative',
//     overflow: 'hidden',
//   },
// };
