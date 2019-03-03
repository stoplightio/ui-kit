import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Icon, IconLibrary } from '../Icon';
import { ToastContent } from '../Toast';

function expectToast(type: string, iconClassName: string) {
  const toast = mount(<ToastContent title="title" message="message" type={type} />);

  expect(toast.find(Icon).filterWhere((node: any) => node.prop('icon') === iconClassName)).toHaveLength(1);
  expect(toast.find('b').text()).toEqual('title');
  expect(toast.find('p').text()).toEqual('message');
}

describe('Toast', () => {
  it('renders error toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('error', 'times-circle');
  });

  it('renders info toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('info', 'info-circle');
  });

  it('renders default toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('default', 'lightbulb');
  });

  it('renders success toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('success', 'check-circle');
  });

  it('renders warning toast', () => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);

    expectToast('warning', 'exclamation-triangle');
  });
});
