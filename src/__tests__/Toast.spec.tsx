import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { IconLibrary } from '../Icon';
import { Toast } from '../Toaster/Toast';

function expectToast(type: string, iconClassName: string) {
  const toast = mount(
    <Toast
      content={{
        title: 'Title',
        body: 'Body',
      }}
      type={type}
    />
  );

  expect(toast.find(`svg.${iconClassName}`)).toHaveLength(1);
  expect(toast.find('b').text()).toEqual('Title');
  expect(toast.find('p').text()).toEqual('Body');
}

describe('Toast', () => {
  it('renders error toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('error', 'fa-times-circle');
  });

  it('renders info toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('info', 'fa-info-circle');
  });

  it('renders default toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('default', 'fa-lightbulb');
  });

  it('renders success toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('success', 'fa-check-circle');
  });

  it('renders warning toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('warning', 'fa-exclamation-triangle');
  });
});
