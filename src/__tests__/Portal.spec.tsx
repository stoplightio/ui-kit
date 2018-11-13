/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import 'jest-enzyme';
import { shallow } from 'enzyme';
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

  it('removes the previously appended div to unmount', () => {
    const wrapper = shallow(<Portal>test</Portal>);
    // @ts-ignore;
    const { el } = wrapper.instance();

    wrapper.unmount();

    expect(removeChildSpy).toHaveBeenCalledWith(el);
  });

  it('renders children', () => {
    const children = <div>some children</div>;
    const wrapper = shallow(<Portal>{children}</Portal>);

    expect(wrapper).toContainReact(children);
  });

  it('attaches className when given', () => {
    const className = 'test-classname';
    shallow(<Portal className={className}>test</Portal>);

    expect(setClassNameSpy).toHaveBeenCalledWith(className);
  });
});
