import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, Button, createThemedModule, Flex, IBox, ITheme } from '../../';

interface ILayoutTheme extends ITheme {
  container?: {
    fg: string;
    bg: string;
  };
}

type Zones = 'inner' | 'inverted';
const { ThemeZone, useTheme } = createThemedModule<Zones, ILayoutTheme>();

storiesOf('Views:Kitchen Sink', module)
  .addDecorator(withKnobs)
  .add('Flex and Box', () => <App />);

/** Our fictitional App */

const App = () => {
  const theme = useTheme();

  return (
    <Flex flexDirection="column" textAlign="center" p={7} pt={15} position="relative" border="1px solid">
      <BoxBadge color={theme.link.fg}>Flex Column</BoxBadge>

      <CustomStoryBox p={15}>[zone: none] the default root theme values, with some extra padding</CustomStoryBox>

      <Flex p={7} pt={15} mt={7} position="relative" backgroundColor="red">
        <BoxBadge>Flex Row</BoxBadge>

        <ThemeZone name="inner">
          <CustomStoryBox flex="1" p={11} pt={15} mr={7}>
            <Box>[zone: 'inner'] defaults canvas.bg to purple and canvas.fg to white</Box>
            <Button mt={11}>Go</Button>
          </CustomStoryBox>
        </ThemeZone>

        <ThemeZone name="inverted">
          <CustomStoryBox flex="1" p={11} pt={15}>
            <Box>[zone: 'inverted'] inverts canvas bg and fg</Box>
            <Button mt={11}>Go</Button>
          </CustomStoryBox>
        </ThemeZone>
      </Flex>
    </Flex>
  );
};

const BoxBadge: React.FunctionComponent<IBox> = props => (
  <Box
    fontSize={0}
    position="absolute"
    top={0}
    right={0}
    px={4}
    py="1px"
    fontStyle="italic"
    {...props}
    borderBottom="1px solid"
    borderLeft="1px solid"
  />
);

const CustomStoryBox: React.FunctionComponent<IBox> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      backgroundColor={theme.container && theme.container.bg}
      color={theme.container && theme.container.fg}
      position="relative"
      {...props}
    >
      {children}
      <BoxBadge>Box</BoxBadge>
    </Box>
  );
};
