jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-toastify');

import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { toast as toastify, ToastContainer } from 'react-toastify';
import { toast, Toaster } from '../Toaster';
import { Toast } from '../Toaster/Toast';

describe('Toaster', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders ToastContainer', () => {
    const wrapper = mount(<Toaster />);
    expect(wrapper.find(ToastContainer)).toHaveLength(1);
    wrapper.unmount();
  });

  describe('toast()', () => {
    it('delegates to react-toastify', () => {
      const content = { title: 'title', body: 'body' };
      const type = 'info';
      const options: any = { type };
      toast(content, options);

      expect(toastify).toHaveBeenCalledTimes(1);
      expect(toastify).toHaveBeenCalledWith(<Toast content={content} type={type} />, options);
    });

    it('renders DEFAULT by default (no options)', () => {
      const content = { title: 'title', body: 'body' };

      toast(content);

      expect(toastify).toHaveBeenCalledTimes(1);
      expect(toastify).toHaveBeenCalledWith(<Toast content={content} type="default" />, undefined);
    });

    it('renders DEFAULT by default (no type)', () => {
      const content = { title: 'title', body: 'body' };

      toast(content, {});

      expect(toastify).toHaveBeenCalledTimes(1);
      expect(toastify).toHaveBeenCalledWith(<Toast content={content} type="default" />, {});
    });
  });
});
