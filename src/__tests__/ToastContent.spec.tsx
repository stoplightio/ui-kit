import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { IconLibrary } from '../index';
import { ToastContent } from '../Toast';

function expectToast(type: string) {
  const toast = mount(<ToastContent title="title" message="message" type={type} />);

  expect(toast.text()).toEqual('titlemessage');
}

describe('ToastContent', () => {
  beforeAll(() => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);
  });

  it('renders error toast', () => {
    expectToast('error');
  });

  it('renders info toast', () => {
    expectToast('info');
  });

  it('renders default toast', () => {
    expectToast('default');
  });

  it('renders success toast', () => {
    expectToast('success');
  });

  it('renders warning toast', () => {
    expectToast('warning');
  });
});
