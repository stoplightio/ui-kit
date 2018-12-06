import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, IBox } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { createThemedModule } from '../theme';

type Zones = 'inner' | 'inverted';
const { ThemeZone, useTheme } = createThemedModule<Zones>();

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add('Flex and Box', () => <App />);

/** Our fictitional App */

const App = () => {
  const theme = useTheme();

  return (
    <Flex
      flexDirection="column"
      textAlign="center"
      p={2}
      pt={4}
      position="relative"
      border={`1px solid ${theme.canvas.bg}`}
    >
      <BoxBadge>Flex Column</BoxBadge>

      <CustomStoryBox p={4}>[zone: none] the default root theme values, with some extra padding</CustomStoryBox>

      <Flex
        p={2}
        pt={4}
        mt={2}
        position="relative"
        backgroundColor="overwridden-by-style-prop"
        style={{ backgroundColor: theme.canvas.bg }}
      >
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

const BoxBadge: React.FunctionComponent = props => {
  const theme = useTheme();

  return (
    <Box
      fontSize={0}
      position="absolute"
      top={0}
      right={0}
      px={1}
      py="1px"
      fontStyle="italic"
      {...props}
      backgroundColor={theme.canvas.bg}
      color={theme.canvas.fg}
      borderBottom={`1px solid ${theme.canvas.fg}`}
      borderLeft={`1px solid ${theme.canvas.fg}`}
    />
  );
};

const CustomStoryBox: React.FunctionComponent<IBox> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Box backgroundColor={theme.canvas.bg} color={theme.canvas.fg} position="relative" {...props}>
      {children}
      <BoxBadge>Box</BoxBadge>
    </Box>
  );
};
