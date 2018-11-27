import { get } from 'lodash';
import * as React from 'react';
import ReactSelect from 'react-select';

import { IThemeInterface } from './types';

import { withTheme } from 'styled-components';

// subset taken from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-select/lib/Select.d.ts
// some props were renamed for better usage
interface ISelectProps {
  /* Remove the currently focused option when the user presses backspace */
  backspaceRemovesValue?: boolean;
  /* Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices): blurInputOnSelect */
  blurOnSelect?: boolean;
  /* className attribute applied to the outer component */
  className?: string;
  /* Close the select menu when the user selects an option */
  closeOnSelect?: boolean;
  /* Close the select menu when the page is scrolled */
  closeOnScroll?: boolean | EventListener;
  /* Custom method to filter whether an option should be displayed in the menu */
  filterOption?: (option: { label: string; value: string; data: any }, rawInput: string) => boolean;
  /* Hide the selected option from the menu */
  hideSelectedOptions?: boolean;
  /* The id to set on the SelectContainer component. */
  id?: string;
  /* The value of the search input: inputValue */
  searchValue?: string;
  /* Is the select value clearable: isClearable */
  clearable?: boolean;
  /* Is the select disabled: isDisabled */
  disabled?: boolean;
  /* Is the select in a state of loading (async): isLoading */
  loading?: boolean;
  /* Support multiple selected options: isMulti */
  multi?: boolean;
  /* Whether to enable search functionality: isSearchable */
  searchable?: boolean;
  /* Async: Text to display when loading options */
  loadingMessage?: string;
  /* Minimum height of the menu before flipping */
  minMenuHeight?: number;
  /* Maximum height of the menu before scrolling */
  maxMenuHeight?: number;
  /* Whether the menu is open */
  menuIsOpen?: boolean;
  /* Default placement of the menu in relation to the control. 'auto' will flip
       when there isn't enough space below the control. */
  menuPlacement?: 'auto' | 'bottom' | 'top';
  /* Text to display when there are no options */
  noOptionsMessage?: string;
  /* Handle blur events on the control */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /* Handle change events on the select */
  onChange?: (value: any) => void;
  /* Handle focus events on the control */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /* Handle change events on the input: onInputChange*/
  onSearch?: (value: string) => void;
  /* Handle the menu opening: onMenuOpen */
  onOpen?: () => void;
  /* Handle the menu closing: onMenuClose */
  onClose?: () => void;
  /* Fired when the user scrolls to the top of the menu: onMenuScrollToTop */
  onScrollToTop?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /* Fired when the user scrolls to the bottom of the menu: onMenuScrollToBottom */
  onScrollToBottom?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /* Allows control of whether the menu is opened when the Select is focused */
  openOnFocus?: boolean;
  /* Allows control of whether the menu is opened when the Select is clicked */
  openOnClick?: boolean;
  /* Array of options that populate the select menu */
  options?: any | any[];
  /* Placeholder text for the select value */
  placeholder?: string;
  /* The value of the select; reflected by the selected option */
  value?: any | any[];
  defaultSearchValue?: string;
  defaultValue?: any | any[];

  // theme injected from styled-components
  theme?: IThemeInterface;
}

export const SelectBase = (props: ISelectProps) => {
  const {
    id,
    className,

    value,
    options,
    searchValue,
    defaultValue,
    defaultSearchValue,

    multi,
    loading,
    disabled,
    clearable,
    searchable,
    placeholder,
    loadingMessage,
    noOptionsMessage,

    onBlur,
    onFocus,
    onChange,
    onSearch,
    onOpen,
    onClose,
    openOnFocus,
    openOnClick,
    onScrollToTop,
    onScrollToBottom,

    menuIsOpen,
    minMenuHeight = 140,
    maxMenuHeight = 300,
    menuPlacement = 'bottom',

    blurOnSelect = !props.multi,
    closeOnSelect = !props.multi,
    closeOnScroll = false,

    filterOption,

    hideSelectedOptions = true,
    backspaceRemovesValue = true,
  } = props;

  return (
    <ReactSelect
      backspaceRemovesValue={backspaceRemovesValue}
      blurInputOnSelect={blurOnSelect}
      className={className}
      closeMenuOnSelect={closeOnSelect}
      closeMenuOnScroll={closeOnScroll}
      filterOption={filterOption}
      hideSelectedOptions={hideSelectedOptions}
      id={id}
      inputValue={searchValue}
      isClearable={clearable}
      isDisabled={disabled}
      isLoading={loading}
      isMulti={multi}
      isSearchable={searchable}
      loadingMessage={() => loadingMessage || 'Loading...'}
      minMenuHeight={minMenuHeight}
      maxMenuHeight={maxMenuHeight}
      menuIsOpen={menuIsOpen}
      menuPlacement={menuPlacement}
      noOptionsMessage={() => noOptionsMessage || 'No Options'}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onInputChange={onSearch}
      onMenuOpen={onOpen}
      onMenuClose={onClose}
      onMenuScrollToTop={onScrollToTop}
      onMenuScrollToBottom={onScrollToBottom}
      openMenuOnFocus={openOnFocus}
      openMenuOnClick={openOnClick}
      options={options}
      placeholder={placeholder}
      value={value}
      defaultInputValue={defaultSearchValue}
      defaultValue={defaultValue}
      // CUSTOM STYLES
      styles={customStyles(props.theme)}
    />
  );
};

// inject theme into component
export const Select = withTheme(SelectBase);

/**
 * @param {Object} provided -- the component's default styles
 * @param {Object} state -- the component's current state e.g. `isFocused`
 */

const customStyles = (theme?: IThemeInterface) => {
  const colors = get(theme, 'components.select', {});
  const indicator = colors.indicator || {};
  const chip = colors.chip || {};
  const menu = colors.menu || {};
  const selected = menu.selected || {};

  return {
    control: (provided: any, state: any) => {
      return {
        ...provided,

        backgroundColor: colors.bg,
        borderColor: colors.border,
        boxShadow: 'none',

        '&:hover': { borderColor: colors.border },
      };
    },
    singleValue: (provided: any, state: any) => {
      return { ...provided, color: colors.fg };
    },
    dropdownIndicator: (provided: any, state: any) => {
      return {
        ...provided,

        color: indicator.fg,
        backgroundColor: indicator.bg,
        borderRadius: 4,
        cursor: 'pointer',

        '&:hover': { color: indicator.fg },
      };
    },
    indicatorSeparator: (provided: any, state: any) => {
      return { ...provided, backgroundColor: indicator.fg };
    },
    clearIndicator: (provided: any, state: any) => {
      return {
        ...provided,

        color: indicator.fg,
        backgroundColor: indicator.bg,
        cursor: 'pointer',

        '&:hover': { color: indicator.fg },
      };
    },
    placeholder: (provided: any, state: any) => {
      const { isDisabled } = state;
      return { ...provided, opacity: 0.5, color: colors.fg, cursor: isDisabled ? 'default' : 'text' };
    },
    multiValueLabel: (provided: any, state: any) => {
      return { ...provided, color: chip.fg, backgroundColor: chip.bg };
    },
    multiValueRemove: (provided: any, state: any) => {
      return {
        ...provided,

        color: chip.fg,
        backgroundColor: chip.bg,
        cursor: 'pointer',

        '&:hover': {
          color: chip.fg,
          backgroundColor: chip.bg,
        },
      };
    },
    menu: (provided: any, state: any) => {
      return {
        ...provided,
        color: menu.fg,
        backgroundColor: menu.bg,
      };
    },
    option: (provided: any, state: any) => {
      const { isSelected, isMulti } = state;

      return {
        ...provided,

        cursor: isMulti || !isSelected ? 'pointer' : 'default',

        color: isSelected ? selected.fg : menu.fg,
        backgroundColor: isSelected ? selected.bg : menu.bg,

        '&:active': {
          color: isSelected ? selected.fg : menu.fg,
          background: isSelected ? selected.bg : menu.bg,
        },

        '&:hover': {
          color: (isMulti || !isSelected) && selected.fg,
          background: (isMulti || !isSelected) && selected.bg,

          opacity: (isMulti || !isSelected) && 0.5,
        },
      };
    },
    loadingMessage: (provided: any, state: any) => {
      return { ...provided, color: menu.fg };
    },
    noOptionsMessage: (provided: any, state: any) => {
      return { ...provided, color: menu.fg };
    },
  };
};
