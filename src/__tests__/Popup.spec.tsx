import { mount } from 'enzyme';
import 'jest-enzyme';
import debounce = require('lodash/debounce');
import * as React from 'react';

import { Popup } from '../Popup';
import { PopupContent } from '../Popup/PopupContent';

describe('Popup', () => {
  let props: any;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(async () => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    jest.useFakeTimers();

    props = {
      renderContent: jest.fn(() => <div />),
      renderTrigger: jest.fn(() => <div />),
      hideDelay: 300,
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('always calls renderTrigger on render with internal properties', () => {
    const { renderTrigger: renderTriggerSpy } = props;
    const wrapper = mount(<Popup {...props} />);
    const [[{ showPopup, hidePopup }]] = renderTriggerSpy.mock.calls;

    expect(renderTriggerSpy).toHaveBeenCalledWith({
      hidePopup,
      showPopup,
      isOver: false,
      isVisible: false,
    });

    wrapper.unmount();
  });

  it('does not call renderContent by default', () => {
    const renderTriggerSpy = jest.spyOn(props, 'renderContent');
    const wrapper = mount(<Popup {...props} />);

    expect(renderTriggerSpy).not.toHaveBeenCalledWith();
    wrapper.unmount();
  });

  it('attaches debounced paint resize handler', () => {
    const handler = () => true;
    (debounce as any).mockReturnValueOnce(handler);

    const wrapper = mount(<Popup {...props} />);

    // let's test if debounce was invoked properly
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
    // and now if event listener was correctly attached

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', handler);
    wrapper.unmount();
  });

  it('removes the previously attached resize handler', () => {
    const handler = () => true;
    (debounce as any).mockReturnValueOnce(handler);

    const wrapper = mount(<Popup {...props} />);
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', handler);
  });

  describe('when Popup is visible', () => {
    let setStateSpy: jest.SpyInstance;
    let repaintSpy: jest.SpyInstance;
    let useCallbackSpy: jest.SpyInstance;
    let setVisibilitySpy: jest.SpyInstance;

    beforeEach(() => {
      repaintSpy = jest.fn();
      useCallbackSpy = jest.spyOn(React, 'useCallback').mockReturnValue(repaintSpy);

      setStateSpy = jest.spyOn(React, 'useState');
      setVisibilitySpy = jest.fn();
      setStateSpy.mockReturnValueOnce([true, setVisibilitySpy]);
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      useCallbackSpy.mockRestore();
    });

    it('calls renderTrigger and passes proper isVisible', () => {
      const wrapper = mount(<Popup {...props} />);

      expect(props.renderTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          isVisible: true,
        })
      );
      wrapper.unmount();
    });

    it('renders PopupContent', () => {
      const wrapper = mount(<Popup {...props} />);

      expect(wrapper.find(PopupContent)).toExist();
      wrapper.unmount();
    });

    it('calls on renderContent and passes some internal methods', () => {
      const renderContentSpy = jest.spyOn(props, 'renderContent');
      const wrapper = mount(<Popup {...props} />);

      expect(renderContentSpy).toHaveBeenCalledWith({
        showPopup: expect.any(Function),
        hidePopup: expect.any(Function),
        isVisible: true,
        isOver: false,
      });
      wrapper.unmount();
    });

    it('repaints the popup when props change', () => {
      const wrapper = mount(<Popup {...props} />);
      wrapper.setProps({ padding: 10 });
      expect(repaintSpy).toHaveBeenCalled();
      wrapper.unmount();
    });

    describe('hidePopup', () => {
      it('aborts the request if already in progress', () => {
        const wrapper = mount(<Popup {...props} />);
        const [[{ hidePopup, showPopup }]] = props.renderTrigger.mock.calls;

        showPopup();
        hidePopup();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        wrapper.unmount();
      });

      it('sets a timeout according to given hideDelay', () => {
        const hideDelay = parseInt(String(Math.random() * 100000), 10);
        const wrapper = mount(<Popup {...props} hideDelay={hideDelay} />);

        const [[{ hidePopup }]] = props.renderTrigger.mock.calls;

        hidePopup();
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), hideDelay);
        wrapper.unmount();
      });

      it('hides popup once timeouts', () => {
        const wrapper = mount(<Popup {...props} />);
        const [[{ hidePopup }]] = props.renderTrigger.mock.calls;
        hidePopup();

        jest.runAllTimers();
        expect(setVisibilitySpy).toHaveBeenCalledWith(false);
        wrapper.unmount();
      });

      describe('repaint', () => {
        it('always sets style', () => {
          const wrapper = mount(<Popup {...props} />);

          expect(wrapper.find(PopupContent)).toHaveProp('style');

          wrapper.unmount();
        });
      });
    });
  });

  describe('showPopup', () => {
    it('clears willHide timeout', () => {
      const wrapper = mount(<Popup {...props} />);
      const [[{ showPopup, hidePopup }]] = props.renderTrigger.mock.calls;

      hidePopup();
      showPopup();

      expect(clearTimeout).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  it('handleMouseEnter shows popup', () => {
    const trigger = <span id="trigger">foo</span>;

    props.renderTrigger.mockReturnValue(trigger);

    const wrapper = mount(<Popup {...props} isVisible={false} />);

    wrapper.find('#trigger').simulate('mouseenter');

    expect(wrapper.find(PopupContent)).toExist();
    wrapper.unmount();
  });
});
