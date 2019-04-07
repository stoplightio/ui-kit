import * as React from 'react';
import { ReactEventHandler } from 'react';
import ReactSelect from 'react-select';
import ReactAsyncSelect, { Props as AsyncProps } from 'react-select/lib/Async'; // we can live with it, as it adds very little overhead (just a wrapper around Select)
import ReactAsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import ReactCreatableSelect, { Props as CreatableProps } from 'react-select/lib/Creatable';
import { Props } from 'react-select/lib/Select';

import { Omit } from '@stoplight/types';
import { ITheme, useTheme } from './theme';

// renamed some props from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-select/lib/Select.d.t
export interface ISelectBaseProps {
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
  onScrollToTop?: ReactEventHandler<HTMLElement>; // onMenuScrollToTop
  onScrollToBottom?: ReactEventHandler<HTMLElement>; // onMenuScrollToBottom

  loadingMessage?: string;
  noOptionsMessage?: string;

  blurOnSelect?: boolean; // blurInputOnSelect
  closeOnSelect?: boolean;
  closeOnScroll?: boolean;

  allowCreate?: boolean;
  invalid?: boolean;
}

export interface ISelectProps
  extends ISelectBaseProps,
    Omit<Props<ISelectOption>, 'noOptionsMessage' | 'loadingMessage'> {}

export interface ISelectAsyncProps
  extends ISelectBaseProps,
    Omit<AsyncProps<ISelectOption>, 'noOptionsMessage' | 'loadingMessage'> {}

export interface ISelectCreatableProps
  extends ISelectBaseProps,
    Omit<CreatableProps<ISelectOption>, 'noOptionsMessage' | 'loadingMessage'> {}

export type ISelectAsyncCreatableProps = ISelectCreatableProps & ISelectAsyncProps;

export type ISelect = ISelectProps | ISelectAsyncProps | ISelectCreatableProps | ISelectAsyncCreatableProps;

export interface ISelectOption {
  label: string;
  value: any;
}

const Select: React.FunctionComponent<ISelect> = props => {
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

    allowCreate = false,
    invalid = false,

    ...selectProps
  } = props;

  const { select: theme } = useTheme();

  const actualProps = {
    blurInputOnSelect: blurOnSelect,
    closeMenuOnSelect: closeOnSelect,
    closeMenuOnScroll: closeOnScroll,
    inputValue: searchValue,
    isClearable: clearable,
    isDisabled: disabled,
    isLoading: loading,
    isMulti: multi,
    menuIsOpen: isOpen,
    isSearchable: searchable,
    loadingMessage: () => loadingMessage,
    noOptionsMessage: () => noOptionsMessage,
    onInputChange: onSearch,
    onMenuOpen: onOpen,
    onMenuClose: onClose,
    onMenuScrollToTop: onScrollToTop,
    onMenuScrollToBottom: onScrollToBottom,
    ...selectProps,
    // CUSTOM STYLES
    styles: selectProps.styles || selectStyles(theme, invalid),
  };

  if ('loadOptions' in props && ('onCreateOption' in props || allowCreate)) {
    return <ReactAsyncCreatableSelect {...actualProps} />;
  }

  if ('loadOptions' in props) {
    return <ReactAsyncSelect {...actualProps} />;
  }

  if ('onCreateOption' in props || allowCreate) {
    return <ReactCreatableSelect {...actualProps} />;
  }

  return <ReactSelect {...actualProps} />;
};

/**
 * Component styles copied from React-Select
 * removed most of the non-color, spacing, border related styles
 * override color related
 */

export const selectStyles = (baseTheme: ITheme['select'], invalid: boolean) => {
  if (!baseTheme) {
    return {};
  }

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const { chip: chipTheme, menu: menuTheme } = baseTheme;

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return {
    clearIndicator: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: theme.border || theme.fg,
      padding: '0px',

      ':hover': {
        color: theme.border || theme.fg,
        opacity: !isDisabled && 0.6,
      },
    }),
    container: (provided: any) => ({
      ...provided,
      pointerEvents: null,
    }),
    control: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: theme.fg,
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

      minWidth: '147px',
      minHeight: '35px',
      padding: '0px 5px 0px 10px',
      boxSizing: 'border-box',
      fontSize: '11px',

      borderRadius: '2px',
      boxShadow: null,
      outline: '0 !important',

      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled && 0.6,

      ':hover': {
        borderColor: theme.border,
      },
    }),
    dropdownIndicator: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      color: theme.border || theme.fg,

      padding: '0px',

      ':hover': {
        color: theme.border || theme.fg,
        opacity: !isDisabled && 0.6,
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: theme.border || theme.fg,
      marginLeft: '5px',
      marginRight: '5px',
    }),
    input: (provided: any, { isDisabled }: { isDisabled: false }) => ({
      ...provided,
      color: theme.fg,

      padding: '0px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: theme.border || theme.fg,
      padding: '0px',
    }),
    loadingMessage: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
      padding: '0px',
      fontSize: '14px',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
      backgroundColor: menuTheme.bg,
      border: menuTheme.border ? `1px solid ${menuTheme.border}` : 'none',

      zIndex: 10000,
      padding: '5px 7px',
      borderRadius: '3px',
      minWidth: '180px',
      maxWidth: '280px',
      boxShadow: 'none',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      alignItems: 'center',
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,
      fontWeight: 500,
      margin: '0px 5px 0px 0px',
      borderRadius: '3px',
      overflow: 'hidden',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: chipTheme.border,
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,
      borderRadius: '0px',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: chipTheme.fg,
      backgroundColor: chipTheme.bg,

      paddingLeft: '0px',
      borderRadius: '0px',

      ':hover': {
        color: chipTheme.fg,
        backgroundColor: chipTheme.bg,
      },
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      color: menuTheme.fg,
      fontSize: '14px',
      padding: '0px',
    }),
    option: (
      provided: React.CSSProperties,
      { isMulti, isSelected }: Partial<{ isMulti: boolean; isSelected: boolean }>
    ) => {
      return {
        ...provided,

        padding: '5px 7px',
        fontSize: '14px',
        borderRadius: '2px',

        cursor: isMulti || !isSelected ? 'pointer' : 'default',

        color: menuTheme.fg,
        backgroundColor: isSelected ? menuTheme.selectedBg : 'transparent',

        // provide some affordance on touch devices
        ':active': {
          backgroundColor: isSelected ? menuTheme.selectedBg : menuTheme.hoverBg,
        },

        ':hover': {
          backgroundColor: isSelected ? menuTheme.selectedBg : menuTheme.hoverBg,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: theme.fg,

      opacity: 0.6,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme.fg,
      padding: '0px',
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0px',
    }),
  };
};

/**
 * React-Select Styles
 * Copied over the styles from each component that are overridable, this will serve as a quick reference to what is actually being applied to the components by default
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

export { Select };
