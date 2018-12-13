/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { FunctionComponent } from 'react';

import { Box, Button, createThemedModule, Flex, IBox } from '../../';

type Zones = 'inner' | 'inverted';
const { ThemeZone, useTheme } = createThemedModule<Zones>();

storiesOf('Views:Kitchen Sink', module)
  .addDecorator(withKnobs)
  .add('Flex and Box', () => <App />);

/** Our fictitional App */

const App = () => {
  const theme = useTheme();

  return (
    <Flex flexDirection="column" textAlign="center" p={2} pt={4} position="relative" border="1px solid">
      <BoxBadge color={theme.link.fg}>Flex Column</BoxBadge>

      <CustomStoryBox p={4}>[zone: none] the default root theme values, with some extra padding</CustomStoryBox>

      <Flex p={2} pt={4} mt={2} position="relative" backgroundColor="red">
        <BoxBadge>Flex Row</BoxBadge>

        <ThemeZone name="inner">
          <CustomStoryBox flex="1" p={3} pt={4} mr={2}>
            <Box>[zone: 'inner'] defaults canvas.bg to purple and canvas.fg to white</Box>
            <Button mt={3}>Go</Button>
          </CustomStoryBox>
        </ThemeZone>

        <ThemeZone name="inverted">
          <CustomStoryBox flex="1" p={3} pt={4}>
            <Box>[zone: 'inverted'] inverts canvas bg and fg</Box>
            <Button mt={3}>Go</Button>
          </CustomStoryBox>
        </ThemeZone>
      </Flex>
    </Flex>
  );
};

const BoxBadge: FunctionComponent<IBox> = props => (
  <Box
    fontSize={0}
    position="absolute"
    top={0}
    right={0}
    px={1}
    py="1px"
    fontStyle="italic"
    {...props}
    borderBottom="1px solid"
    borderLeft="1px solid"
  />
);

const CustomStoryBox: FunctionComponent<IBox> = ({ children, ...props }) => (
  <Box position="relative" {...props}>
    {children}
    <BoxBadge>Box</BoxBadge>
  </Box>
);
