import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { Box } from '../src/Box';
import { Button } from '../src/Button';
import { Flex } from '../src/Flex';
import { Heading } from '../src/Heading';
import { Icon } from '../src/Icon';
import { Text } from '../src/Text';
import { ThemeSection } from '../src/ThemeSection';

storiesOf('Complex', module).add(
  'kitchen sync',
  () => (
    <div style={{ width: '100%' }}>
      <Flex
        width={2 / 3}
        direction="column"
        shadow="medium"
        radius="md"
        border="xs"
        css={{ overflow: 'hidden', margin: 'auto' }}
      >
        <ThemeSection section="header">
          <Flex bg="bg" borderBottom="xs" borderColor="border" text="md">
            <Flex>
              <Heading as="h4" text="lg" py="md" pl="md" fg="fg">
                My Project
              </Heading>
            </Flex>
            <Flex flex="1 1 auto" />
            <Flex items="center" pr="md">
              <Button>
                <Icon icon="rocket" /> Release
              </Button>
            </Flex>
          </Flex>
        </ThemeSection>

        <Flex>
          <ThemeSection section="sidebar">
            <Box width={200} bg="bg" fg="fg" p="xl" borderRight="xs" borderColor="border">
              <Text>One</Text>
              <Text mt="xs">Two</Text>
            </Box>
          </ThemeSection>

          <ThemeSection section="main">
            <Box p="lg" bg="bg" fg="fg" flex="1 1 auto">
              <Heading>Intro</Heading>
              <Text mt="sm">Yada yada, some text!</Text>
              <Button mt="lg">A Button</Button>
            </Box>
          </ThemeSection>
        </Flex>

        <ThemeSection section="footer">
          <Flex bg="bg" borderTop="xs" borderColor="border" text="sm" weight="medium">
            <Flex>
              <Box px="md" py="sm" fg="error">
                3 Errors
              </Box>
            </Flex>
          </Flex>
        </ThemeSection>
      </Flex>
    </div>
  ),
  {
    info: {
      disable: true,
    },
  }
);