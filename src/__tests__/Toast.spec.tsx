import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { IconLibrary } from '../Icon';
import { NotificationType, Toast } from '../Toast';

function expectToast(type: NotificationType, iconClassName: string) {
  const toast = mount(
    <Toast
      notification={{
        title: 'Title',
        body: 'Body',
        type,
      }}
    />
  );

  expect(toast.find(`svg.${iconClassName}`)).toHaveLength(1);
  expect(toast.find('b').text()).toEqual('Title');
  expect(toast.find('p').text()).toEqual('Body');
}

describe('Toast', () => {
  it('renders toasts with icons', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast(NotificationType.INFO, 'fa-info-circle');
    expectToast(NotificationType.WARNING, 'fa-exclamation-triangle');
    expectToast(NotificationType.ERROR, 'fa-times-circle');
  });

  it('emits close events', () => {
    const onClose = jest.fn();
    const notification = {
      title: 'Title',
      body: 'Body',
      type: NotificationType.INFO,
    };

    const toast = mount(<Toast notification={notification} onClose={onClose} />);

    toast.find('.fa-window-close').simulate('click');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(notification);
  });
});
