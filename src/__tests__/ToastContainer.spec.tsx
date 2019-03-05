jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-toastify');

import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { toast as ReactToast, ToastContainer as ReactToastContainer } from 'react-toastify';
import { IToast, Toast, ToastContainer, ToastContent } from '../Toast';

describe('ToastContainer', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders ToastContainer', () => {
    const wrapper = mount(<ToastContainer />);
    expect(wrapper.find(ReactToastContainer)).toExist();
    wrapper.unmount();
  });

  describe('Toast()', () => {
    it('calls react-toastify', () => {
      const content: IToast = { type: 'info', title: 'title', message: 'message' };
      Toast(content);

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} actions={[]} type="info" />, {});
    });

    it('renders default (no options)', () => {
      const content: IToast = { title: 'title', message: 'message' };

      Toast(content);

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} actions={[]} type="default" />, {});
    });

    it('renders default', () => {
      const content: IToast = { type: 'error', title: 'title', message: 'message' };
      const options: IToast = { autoClose: false };

      Toast({ ...content, ...options });

      expect(ReactToast).toHaveBeenCalledTimes(1);
      expect(ReactToast).toHaveBeenCalledWith(<ToastContent {...content} actions={[]} type="error" />, options);
    });
  });
});
