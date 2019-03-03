jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-toastify');

import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { toast as ReactToast, ToastContainer as ReactToastContainer } from 'react-toastify';
import { Toast, ToastContainer, ToastContent } from '../Toast';

describe('Toaster', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders ToastContainer', () => {
    const wrapper = mount(<ToastContainer />);
    expect(wrapper.find(ReactToastContainer)).toExist();
    wrapper.unmount();
  });

  describe('toast()', () => {
    it('delegates to react-toastify', () => {
      const content = { title: 'title', message: 'message' };
      const type = 'info';
      const options: any = { type };
      Toast({ ...content, ...options });

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} type={type} />, options);
    });

    it('renders DEFAULT by default (no options)', () => {
      const content = { title: 'title', message: 'message' };

      Toast(content);

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} type="default" />, undefined);
    });

    it('renders DEFAULT by default (no type)', () => {
      const content = { title: 'title', message: 'message' };

      Toast(content);

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} type="default" />, {});
    });
  });
});
