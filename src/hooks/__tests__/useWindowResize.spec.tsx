import { mount } from 'enzyme';
import 'jest-enzyme';
import debounce = require('lodash/debounce');
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { useWindowResize } from '../useWindowResize';

describe('useWindowResize hook', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let debouncedHandlerMock: jest.MockInstance<EventListener, any>;
  const Wrapper = () => {
    const timestamp = useWindowResize();

    return <span>{timestamp}</span>;
  };
  beforeEach(async () => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    debouncedHandlerMock = jest.fn();
    (debounce as any).mockReturnValueOnce(debouncedHandlerMock);
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('attaches debounced resize listener', () => {
    const wrapper = mount(React.createElement(Wrapper));

    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 16);
    expect(addEventListenerSpy).toHaveBeenLastCalledWith('resize', debouncedHandlerMock);

    wrapper.unmount();
  });

  it('detaches listener on unmount', () => {
    const wrapper = mount(React.createElement(Wrapper));
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', debouncedHandlerMock);
  });

  it('debounced listener sets timestamp', () => {
    let resize: EventListener = () => {
      // nada
    };
    (debounce as any).mockReset();
    (debounce as any).mockImplementationOnce((cb: EventListener) => {
      resize = cb;
    });

    const wrapper = mount(<Wrapper />);

    const event = new Event('resize');

    act(() => {
      resize(event);
    });

    expect(wrapper).toHaveText(String(event.timeStamp));

    wrapper.unmount();
  });
});
