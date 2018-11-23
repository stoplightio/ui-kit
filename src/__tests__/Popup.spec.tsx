import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

describe('Popup', () => {
  let props: any;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let Popup: any;
  let debounce: any;
  let theme: { color: string };

  beforeEach(async () => {
    theme = {
      color: '#fff',
    };

    jest.mock('../Portal', () => ({
      Portal: function Portal({ children }: { children: Function }) {
        return children(theme);
      },
    }));

    ({ Popup } = await import('../'));
    ({ debounce } = await import('lodash'));

    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    jest.useFakeTimers();

    props = {
      renderContent: jest.fn(() => <div />),
      renderTrigger: jest.fn(() => <div />),
    };
  });

  afterEach(() => {
    jest.resetModules();
    jest.unmock('../Portal');
    jest.useRealTimers();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('always calls renderTrigger on render with attributes and some internal methods', () => {
    const renderTriggerSpy = jest.spyOn(props, 'renderTrigger');
    const wrapper = mount(<Popup {...props} />);
    // @ts-ignore
    const { showPopup, hidePopup } = wrapper.instance();

    expect(renderTriggerSpy).toHaveBeenCalledWith(
      {
        onMouseEnter: expect.any(Function),
        onMouseLeave: expect.any(Function),
        ref: expect.any(Function),
      },
      {
        hidePopup,
        showPopup,
        isOver: false,
        isVisible: false,
      }
    );

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

    const wrapper = shallow(<Popup {...props} />);
    // @ts-ignore
    const { repaint } = wrapper.instance();

    // let's test if debounce was invoked properly
    expect(debounce).toHaveBeenCalledWith(repaint, expect.any(Number));
    // and now if event listener was correctly attached

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', handler);
  });

  it('removes the previously attached resize handler', () => {
    const handler = () => true;
    (debounce as any).mockReturnValueOnce(handler);

    const wrapper = shallow(<Popup {...props} />);
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', handler);
  });

  describe('when Popup is visible', () => {
    beforeEach(() => {
      props = {
        ...props,
        show: true,
      };
    });

    it('calls renderTrigger and passes proper isVisible', () => {
      const renderTriggerSpy = jest.spyOn(props, 'renderTrigger');
      shallow(<Popup {...props} />);

      expect(renderTriggerSpy).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          isVisible: true,
        })
      );
    });

    it('renders Portal', () => {
      const wrapper = mount(<Popup {...props} />);

      expect(wrapper.find('Portal')).toExist();
    });

    it('calls on renderContent and passes some internal methods', () => {
      const renderContentSpy = jest.spyOn(props, 'renderContent');
      const wrapper = mount(<Popup {...props} />);
      // @ts-ignore
      const { showPopup, hidePopup } = wrapper.instance();

      expect(renderContentSpy).toHaveBeenCalledWith(
        { theme },
        {
          showPopup,
          hidePopup,
          isVisible: true,
          isOver: false,
        }
      );

      wrapper.unmount();
    });

    it('repaints the popup when props change', () => {
      const wrapper = shallow(<Popup {...props} />);
      const repaintSpy = jest.spyOn(wrapper.instance() as any, 'repaint');

      wrapper.setProps({ padding: 10 });
      expect(repaintSpy).toHaveBeenCalled();
    });

    it('handleMouseEnter does nothing', () => {
      const wrapper = shallow(<Popup {...props} />);
      const instance = wrapper.instance() as any;
      const showPopupSpy = jest.spyOn(instance, 'showPopup');

      instance.handleMouseEnter(false);
      expect(showPopupSpy).not.toHaveBeenCalled();
    });
  });

  describe('hidePopup', () => {
    it('aborts the request if already in progress', () => {
      const wrapper = shallow(<Popup {...props} />);
      const instance = wrapper.instance() as any;
      instance._willHide = 2343;

      instance.hidePopup();
      expect(setTimeout).not.toHaveBeenCalled();
    });

    it('sets a timeout according to given hideDelay', () => {
      const hideDelay = parseInt(String(Math.random() * 100000), 10);
      const wrapper = shallow(<Popup {...props} hideDelay={hideDelay} />);
      const instance = wrapper.instance() as any;
      instance.hidePopup();
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), hideDelay);
    });

    it('clears styles once timeouts', () => {
      const wrapper = shallow(<Popup {...props} />);
      const instance = wrapper.instance() as any;
      instance.hidePopup();
      jest.runAllTimers();
      expect(wrapper).toHaveState('style', undefined);
    });
  });

  describe('showPopup', () => {
    it('clears willHide timeout', () => {
      const wrapper = shallow(<Popup {...props} />);
      const instance = wrapper.instance() as any;
      const timeout = 50;
      instance._willHide = timeout;
      instance.showPopup();
      expect(clearTimeout).toHaveBeenCalledWith(timeout);
      expect(instance).toHaveProperty('_willHide', undefined);
    });

    it('triggers forced re-render', () => {
      const wrapper = shallow(<Popup {...props} />);
      const instance = wrapper.instance() as any;
      const forceUpdate = jest.spyOn(instance, 'forceUpdate');
      instance.showPopup();
      expect(forceUpdate).toHaveBeenCalledWith();
    });
  });

  it('handleMouseEnter calls showPopup', () => {
    const wrapper = shallow(<Popup {...props} isVisible={false} />);
    const instance = wrapper.instance() as any;
    const showPopupSpy = jest.spyOn(instance, 'showPopup');

    instance.handleMouseEnter(false);
    expect(showPopupSpy).toHaveBeenCalled();
  });

  describe('repaint', () => {
    it('always sets style', () => {
      const wrapper = shallow(<Popup {...props} isVisible={false} />);
      const instance = wrapper.instance() as any;
      instance._trigger = {
        getBoundingClientRect: () => ({}),
      };
      instance._content = {
        getBoundingClientRect: () => ({}),
      };

      instance.repaint();
      expect(wrapper).toHaveState(
        'style',
        expect.objectContaining({
          minWidth: expect.anything(),
          left: expect.anything(),
          bottom: expect.anything(),
        })
      );
    });
  });
});
