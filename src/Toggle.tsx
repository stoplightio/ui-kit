import { Omit } from '@stoplight/types';
import * as React from 'react';

import { Box, Flex, IBox, IBoxCSS, ITheme, useTheme } from './';

export interface IToggle extends Omit<IBox<HTMLLabelElement>, 'as|onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FunctionComponent<IToggle> = React.forwardRef<HTMLLabelElement, IToggle>(function Toggle(
  props,
  ref
) {
  const { disabled: isDisabled, onChange, css, ...rest } = props;

  const { toggle: theme } = useTheme();

  const [checked, setValue] = React.useState<boolean>(!!props.checked);
  const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange) onChange(target.checked);
  }, []);

  return (
    <Flex {...rest} as="label" ref={ref} css={[toggleStyles(theme, { isDisabled, isChecked }), css]}>
      <Box
        as="input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        position="absolute"
        css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <Box as="span" css={circleStyles(theme, { isChecked })} />
    </Flex>
  );
});

Toggle.displayName = 'Toggle';

interface IToggleStyles {
  isChecked?: boolean;
  isDisabled?: boolean;
}

const toggleStyles = (theme: ITheme['toggle'], { isDisabled, isChecked }: IToggleStyles): IBoxCSS => {
  return [
    {
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

      height: '16px',
      width: '32px',
      padding: 0,
      margin: 0,
      borderRadius: '100px',

      fontSize: '14px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',

      transition: 'background-color .15s ease-in-out',
    },
    isChecked && {
      backgroundColor: theme.checked,
    },
    isDisabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  ];
};

const circleStyles = (theme: ITheme['toggle'], { isChecked }: IToggleStyles) => {
  return [
    {
      backgroundColor: theme.fg,

      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginLeft: '4px',

      display: 'inline-block',
      transition: 'margin-left .15s ease-in-out',
    },
    isChecked && {
      // toggle width - circle width - original margin left
      marginLeft: '18px',
    },
  ];
};

export { Toggle };
