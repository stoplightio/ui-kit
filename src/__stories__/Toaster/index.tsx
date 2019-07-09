import * as React from 'react';

import { action as StorybookAction } from '@storybook/addon-actions';
import { boolean, button, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconName, Intent, Position, Toaster } from '../../';

const _toaster = Toaster.create({
  position: Position.BOTTOM_RIGHT,
});

storiesOf('Toaster', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => {
    button('Show Toast', showToast);

    let action = {
      icon: text('action.icon', 'airplane') as IconName,
      text: text('action.text', 'Action Text'),
      onClick: StorybookAction('onClick action'),
    };
    let props = {
      ...(boolean('show action', false) && { action }),
      intent: select('intent', Intent, 'primary'),
      message: text('message', 'Hello world!'),
    };

    function showToast() {
      // I found I had to re-run these or else they wouldn't be up-to-date. 
      // Also, Storybook doesn't let you use hooks, and frankly... I don't really know how knobs work.
      // If there's a better way I don't know it yet.
      action = {
        icon: text('action.icon', 'airplane') as IconName,
        text: text('action.text', 'Action Text'),
        onClick: StorybookAction('onClick action'),
      };
      props = {
        ...(boolean('show action', false) && { action }),
        intent: select('intent', Intent, 'primary'),
        message: text('message', 'Hello world!'),
      };
      _toaster.show(props);
    }

    return <div className="p-40" />;
  });
