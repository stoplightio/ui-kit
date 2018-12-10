import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Portal } from '../Portal';

describe('Portal', () => {
  let appendChildSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let setClassNameSpy: jest.SpyInstance;

  beforeEach(() => {
    setClassNameSpy = jest.spyOn(HTMLDivElement.prototype, 'className', 'set');
    appendChildSpy = jest.spyOn(document.body, 'appendChild');
    removeChildSpy = jest.spyOn(document.body, 'removeChild');
  });

  afterEach(() => {
    setClassNameSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('appends div to document.body on mount', () => {
    const node = document.createElement('div');

    shallow(<Portal>test</Portal>);

    expect(appendChildSpy).toHaveBeenCalledWith(node);
  });

  it('removes the previously appended div on unmount', () => {
    const wrapper = shallow(<Portal>test</Portal>);
    // @ts-ignore;
    const { el } = wrapper.instance();

    wrapper.unmount();

    expect(removeChildSpy).toHaveBeenCalledWith(el);
  });

  it('renders children', () => {
    const content = 'some text';
    const children = <div>{content}</div>;
    // shallow cannot traverse Portals, therefore we need to use deep mounting
    const wrapper = mount(<Portal>{children}</Portal>);

    expect(wrapper).toHaveText(content);
    wrapper.unmount(); // let's clean up
  });

  it('attaches className when given', () => {
    const className = 'test-classname';
    shallow(<Portal className={className}>test</Portal>);

    expect(setClassNameSpy).toHaveBeenCalledWith(className);
  });

  describe('lives in non-browser environment', () => {
    let createElementDescriptor: PropertyDescriptor;

    beforeEach(() => {
      createElementDescriptor = Reflect.getOwnPropertyDescriptor(
        Document.prototype,
        'createElement'
      ) as PropertyDescriptor;
      // @ts-ignore
      Document.prototype.createElement = undefined;
    });

    afterEach(() => {
      Object.defineProperty(Document.prototype, 'createElement', createElementDescriptor);
    });

    it('mounts correctly', () => {
      expect(() => shallow(<Portal>test</Portal>)).not.toThrow();
    });

    it('unmounts correctly', () => {
      const wrapper = shallow(<Portal>test</Portal>);
      expect(() => wrapper.unmount()).not.toThrow();
    });

    it('has undefined el', () => {
      const wrapper = shallow(<Portal>test</Portal>);

      expect(wrapper.instance()).toHaveProperty('el', undefined);
    });

    it('does not render anything', () => {
      const wrapper = shallow(<Portal>test</Portal>);

      expect(wrapper.html()).toBeNull();
    });
  });
});
