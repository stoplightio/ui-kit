import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Popup } from '../';
import { useWindowResize } from '../hooks/useWindowResize';
import { PopupContent } from '../Popup/PopupContent';

jest.mock('../theme', () => ({
  useTheme: () => ({ base: 'dark' }),
}));
jest.mock('../hooks/useWindowResize');

describe('Popup component', () => {
  let props: any;
  let addEventListenerSpy: jest.SpyInstance;
  let useEffectSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let useStateSpy: jest.SpyInstance;
  let useRefSpy: jest.SpyInstance;
  let setVisibilitySpy: jest.SpyInstance;

  beforeAll(() => {
    useStateSpy = jest.spyOn(React, 'useState');
    useRefSpy = jest.spyOn(React, 'useRef');
    useEffectSpy = jest.spyOn(React, 'useEffect');
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  beforeEach(() => {
    jest.useFakeTimers();
    useEffectSpy.mockImplementation((fn: Function) => fn);
    useRefSpy.mockImplementation((defaultValue: any) => ({ current: defaultValue }));
    setVisibilitySpy = jest.fn();
    useStateSpy
      .mockReturnValueOnce([false, setVisibilitySpy])
      .mockImplementation((defaultValue: any) => [defaultValue, jest.fn()]);
    props = {
      renderContent: jest.fn(() => <div />),
      renderTrigger: jest.fn(() => <div id="trigger" />),
      hideDelay: 300,
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    useRefSpy.mockReset();
    useEffectSpy.mockReset();
    useRefSpy.mockReset();
  });

  afterAll(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    useStateSpy.mockRestore();
    useRefSpy.mockRestore();
  });

  it('always calls renderTrigger on render with internal properties', () => {
    const { renderTrigger: renderTriggerSpy } = props;
    shallow(<Popup {...props} />);

    expect(renderTriggerSpy).toHaveBeenCalledWith({
      hidePopup: expect.any(Function),
      showPopup: expect.any(Function),
      isOver: false,
      isVisible: false,
    });
  });

  it('does not call renderContent by default', () => {
    const renderTriggerSpy = jest.spyOn(props, 'renderContent');
    shallow(<Popup {...props} />);

    expect(renderTriggerSpy).not.toHaveBeenCalledWith();
  });

  it('uses useWindowResize hook', () => {
    shallow(<Popup {...props} />);

    expect(useWindowResize).toHaveBeenCalled();
  });

  describe('when Popup is visible', () => {
    beforeEach(() => {
      useStateSpy.mockReset();
      useStateSpy
        .mockReturnValueOnce([true, setVisibilitySpy])
        .mockImplementation((defaultValue: any) => [defaultValue, jest.fn()]);
    });

    it('calls renderTrigger and passes proper isVisible', () => {
      shallow(<Popup {...props} />);

      expect(props.renderTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          isVisible: true,
        })
      );
    });

    it('renders PopupContent', () => {
      const wrapper = shallow(<Popup {...props} />);

      expect(wrapper.find(PopupContent)).toExist();
    });

    it('calls on renderContent and passes some internal methods', () => {
      const renderContentSpy = jest.spyOn(props, 'renderContent');
      shallow(<Popup {...props} />);

      expect(renderContentSpy).toHaveBeenCalledWith({
        showPopup: expect.any(Function),
        hidePopup: expect.any(Function),
        isVisible: true,
        isOver: false,
        theme: expect.objectContaining({
          base: expect.any(String),
        }),
      });
    });

    it('aborts hiding request if already in progress', () => {
      const wrapper = shallow(<Popup {...props} />);
      wrapper.find('#trigger').simulate('mouseenter', {});
      wrapper.find('#trigger').simulate('mouseleave', {});

      expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    it('schedules a hide timeout according to given hideDelay', () => {
      const hideDelay = parseInt(String(Math.random() * 100000), 10);
      const wrapper = shallow(<Popup {...props} hideDelay={hideDelay} />);

      wrapper.find('#trigger').simulate('mouseleave', {});

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), hideDelay);
    });

    it('hides popup once timeouts', () => {
      const wrapper = shallow(<Popup {...props} />);

      wrapper.find('#trigger').simulate('mouseleave', {});

      jest.runAllTimers();
      expect(setVisibilitySpy).toHaveBeenCalledWith(false);
    });

    it('clears willHide once mouse enters trigger', () => {
      const wrapper = shallow(<Popup {...props} />);

      wrapper.find('#trigger').simulate('mouseleave', {});
      wrapper.find('#trigger').simulate('mouseenter', {});

      expect(clearTimeout).toHaveBeenCalled();
    });

    describe('repaint', () => {
      it('always sets style', () => {
        const wrapper = shallow(<Popup {...props} />);

        expect(wrapper.find(PopupContent)).toHaveProp('style');
      });
    });
  });

  it('shows popup when mouse enters trigger', () => {
    const wrapper = shallow(<Popup {...props} />);

    wrapper.find('#trigger').simulate('mouseenter', {});

    expect(setVisibilitySpy).toHaveBeenCalledWith(true);
  });
});
