import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
// import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Box, IBox } from '../emotion/Box';
import { createThemedModule, ICustomTheme, ThemeZoneObj, ThemeZones } from '../emotion/theme';
// import {
//   BorderRadius,
//   BorderWidth,
//   BoxShadow,
//   Display,
//   FontSize,
//   FontWeight,
//   FullSpace,
//   OverFlow,
//   PositionOpts,
//   TextAlign,
// } from './_utils';

export const boxKnobs = (tabName = 'Box'): any => {
  return omitBy(
    {
      // fg: text('fg', null, tabName),
      // bg: text('bg', null, tabName),
      // text: select('text', FontSize, '', tabName),
      // borderColor: text('borderColor', null, tabName),
      // align: select('align', TextAlign, '', tabName),
      // weight: select('weight', FontWeight, '', tabName),
      // m: select('m', FullSpace, '', tabName),
      // mt: select('mt', FullSpace, '', tabName),
      // mr: select('mr', FullSpace, '', tabName),
      // mb: select('mb', FullSpace, '', tabName),
      // ml: select('ml', FullSpace, '', tabName),
      // mx: select('mx', FullSpace, '', tabName),
      // my: select('my', FullSpace, '', tabName),
      // p: select('p', FullSpace, '', tabName),
      // pt: select('pt', FullSpace, '', tabName),
      // pr: select('pr', FullSpace, '', tabName),
      // pb: select('pb', FullSpace, '', tabName),
      // pl: select('pl', FullSpace, '', tabName),
      // px: select('px', FullSpace, '', tabName),
      // py: select('py', FullSpace, '', tabName),
      // height: text('height', '', tabName),
      // maxHeight: text('maxHeight', '', tabName),
      // minHeight: text('minHeight', '', tabName),
      // width: text('width', '', tabName),
      // maxWidth: text('maxWidth', '', tabName),
      // minWidth: text('minWidth', '', tabName),
      // border: select('border', BorderWidth, '', tabName),
      // borderTop: select('borderTop', BorderWidth, '', tabName),
      // borderLeft: select('borderLeft', BorderWidth, '', tabName),
      // borderRight: select('borderRight', BorderWidth, '', tabName),
      // borderBottom: select('borderBottom', BorderWidth, '', tabName),
      // radius: select('radius', BorderRadius, '', tabName),
      // shadow: select('shadow', BoxShadow, '', tabName),
      // opacity: number('opacity', 1, {}, tabName),
      // display: select('display', Display, '', tabName),
      // overflow: select('overflow', OverFlow, '', tabName),
      // overflowX: select('overflowX', OverFlow, '', tabName),
      // overflowY: select('overflowY', OverFlow, '', tabName),
      // position: select('position', PositionOpts, '', tabName),
      // top: number('top', 0, {}, tabName),
      // bottom: number('bottom', 0, {}, tabName),
      // left: number('left', 0, {}, tabName),
      // right: number('right', 0, {}, tabName),
      // z: number('z', 0, {}, tabName),
    },
    val => !val
  );
};

type Zones = 'inner' | 'inverted';
const { ThemeProvider, ThemeZone, useTheme, useThemeZones } = createThemedModule<Zones>();

storiesOf('EmotionBox', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <ThemeProviderState>
      <div>
        <StoryBox p={4}>[zone: none] the default root theme values, with some extra padding</StoryBox>

        <br />

        <ThemeZone name="inner">
          <StoryBox p={2}>[zone: 'inner'] defaults canvas.bg to purple and canvas.fg to white</StoryBox>
        </ThemeZone>

        <br />

        <ThemeZone name="inverted">
          <StoryBox p={2}>[zone: 'inverted'] inverts canvas bg and fg</StoryBox>
        </ThemeZone>
      </div>
    </ThemeProviderState>
  ));

const UpdateTheme = React.createContext<React.Dispatch<React.SetStateAction<ICustomTheme>>>(
  () => (state: ICustomTheme) => state
);
export const useUpdateTheme = () => React.useContext(UpdateTheme);

const UpdateZones = React.createContext<React.Dispatch<React.SetStateAction<ThemeZones<Zones>>>>(
  () => (state: ThemeZones<Zones>) => state
);
export const useUpdateZones = () => React.useContext(UpdateZones);

const ThemeProviderState: React.SFC = ({ children }) => {
  const [theme, updateTheme] = React.useState<ICustomTheme>({ base: 'light' });
  const [zones, updateZones] = React.useState<ThemeZones<Zones>>({
    inner: {
      canvas: {
        bg: 'purple',
        fg: 'white',
      },
    },
    inverted: parentTheme => ({
      canvas: {
        bg: parentTheme.canvas.fg,
        fg: parentTheme.canvas.bg,
      },
    }),
  });

  return (
    <UpdateTheme.Provider value={updateTheme}>
      <UpdateZones.Provider value={updateZones}>
        <ThemeProvider theme={theme} zones={zones}>
          <ThemeButtons />

          <br />
          <br />

          {children}
        </ThemeProvider>
      </UpdateZones.Provider>
    </UpdateTheme.Provider>
  );
};

const StoryBox: React.SFC<IBox> = props => {
  const theme = useTheme();

  return (
    <Box
      {...boxKnobs()}
      style={{
        backgroundColor: theme.canvas.bg,
        color: theme.canvas.fg,
      }}
      {...props}
    />
  );
};

const ThemeButtons: React.SFC = () => {
  const theme = useTheme();
  const updateTheme = useUpdateTheme();

  const zones = useThemeZones();
  const updateZones = useUpdateZones();

  return (
    <>
      <button
        onClick={() => {
          updateTheme({ base: 'light' });
        }}
      >
        reset root theme
      </button>
      <button
        onClick={() => {
          theme.canvas.bg = 'blue';
          updateTheme(theme);
        }}
      >
        blue bg
      </button>
      <button
        onClick={() => {
          theme.canvas.fg = 'white';
          updateTheme(theme);
        }}
      >
        white fg
      </button>
      <button
        onClick={() => {
          /** Just for example, should not normally happen like this - entire zone object would be reset */
          (zones.inner as ThemeZoneObj).canvas!.fg = 'yellow';
          updateZones(zones);
        }}
      >
        inner zone yellow fg
      </button>
    </>
  );
};
