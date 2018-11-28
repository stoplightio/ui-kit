// import { get } from 'lodash';
import get = require('lodash/get');
import * as React from 'react';
import ReactSelect from 'react-select';
import { Props } from 'react-select/lib/Select';
import { withTheme } from 'styled-components';

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
      theme={theme => ({
        ...theme,
        colors: buildColors(providerTheme),
      })}
    />
  );
};

export const Select = withTheme(SelectBase);

/**
 * Custom Theme
 */

const buildColors = (theme: IThemeInterface) => {
  const selectTheme = get(theme, 'components.select', {});
  const chipTheme = get(selectTheme, 'chip', {});
  const optionsTheme = get(selectTheme, 'options', {});

  return {
    primary: optionsTheme.selectedbg, // option:background:selected and control:border
    primary75: '', // never used in react-select
    primary50: optionsTheme.activebg, // option:background:active
    primary25: optionsTheme.hoverbg, // option:background:hover

    danger: '', // multiValue:remove
    dangerLight: '', // multiValue:removeIcon

    neutral0: selectTheme.bg, // input:bckground and menu:bckground
    neutral5: selectTheme.bg, // input:background:disabled
    neutral10: chipTheme.bg, // input:border:disabled, multiValue:background
    neutral20: selectTheme.border, // input:border    indicators
    neutral30: selectTheme.border, // input:border:hover
    neutral40: optionsTheme.fg, // menuNotice:color   singleValue:color:disabled
    neutral50: optionsTheme.fg, // placeholder:color
    neutral60: selectTheme.border, // indicators:focused
    neutral70: '', // never used in reactSelect
    neutral80: selectTheme.fg, // input:color mutlival:color singleVal:color indicator:color
};

/**
 * A different visualization of how things are mapped in the theme
 */
// export const colors = {
//   fg: [colors.neutral80],
//   bg: [colors.neutral0],
//   border: [colors.neutral20],

//   chip: {
//     bg: [colors.neutral10],
//   },

//   options: {
//     fg: [colors.neutral40],

//     selectedbg: [colors.primary],
//     activebg: [colors.primary50],
//     hoverbg: [colors.primary25],
//   },
// };
