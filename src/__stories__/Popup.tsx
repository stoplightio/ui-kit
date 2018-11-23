import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';
import * as React from 'react';

import { Box, IThemeInterface, Popup } from '..';

export const popupKnobs = (tabName = 'Popup'): any => {
  return omitBy(
    {
      show: boolean('show', true, tabName),
      posX: select(
        'posX',
        {
          left: 'left',
          center: 'center',
          right: 'right',
        },
        'left',
        tabName
      ),
      posY: select(
        'posY',
        {
          top: 'top',
          center: 'center',
          bottom: 'bottom',
        },
        'top',
        tabName
      ),
      offset: {
        top: number('offset.top', 0, { min: 0 } as NumberOptions, tabName),
        bottom: number('offset.bottom', 0, { min: 0 } as NumberOptions, tabName),
        left: number('offset.left', 0, { min: 0 } as NumberOptions, tabName),
        right: number('offset.right', 0, { min: 0 } as NumberOptions, tabName),
      },
      padding: number('padding', 0, { min: 0 } as NumberOptions, tabName),
      width: number('width', 0, { min: 0 } as NumberOptions, tabName),
    },
    val => !val
  );
};

storiesOf('Popup', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => {
    return (
      <Popup
        {...popupKnobs()}
        renderTrigger={(attributes: object) => {
          return (
            <div style={{ background: 'gray' }} {...attributes}>
              With Defaults
            </div>
          );
        }}
        renderContent={({ theme }: { theme: IThemeInterface }) => {
          const color = theme.colors !== undefined ? theme.colors.fg : '#000';

          return (
            <div style={{ color, boxShadow: `0 0 5px ${color}` }}>{text('content', 'here is the popup content')}</div>
          );
        }}
      />
    );
  })
  .add('with large content', () => {
    return (
      <Popup
        {...popupKnobs()}
        renderTrigger={(attributes: object) => {
          return <Box {...attributes}>With Large Content</Box>;
        }}
        renderContent={({ theme }: { theme: IThemeInterface }) => {
          const color = theme.colors !== undefined ? theme.colors.fg : '#000';

          const elems = [];
          for (let i = 0; i < 100; i++) {
            elems.push(<li key={i}>item {i}</li>);
          }

          return (
            <div style={{ color, boxShadow: `0 0 5px ${color}` }}>
              <ul>{elems}</ul>
            </div>
          );
        }}
      />
    );
  });
