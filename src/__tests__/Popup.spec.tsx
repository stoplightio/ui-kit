/**
 * @jest-environment jsdom
 */
import { shallow } from 'enzyme';
import { debounce } from 'lodash';
import 'jest-enzyme';
import * as React from 'react';
import { Popup, Portal } from '../';

describe('Popup', () => {
  let props: any;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    props = {
      renderContent: jest.fn(() => <div />),
      renderTrigger: jest.fn(() => <div />),
    };
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('always calls renderTrigger on render with attributes and some internal methods', () => {
    const renderContentSpy = jest.spyOn(props, 'renderTrigger');
    const wrapper = shallow(<Popup {...props} />);
    // @ts-ignore
    const { showPopup, hidePopup } = wrapper.instance();

    expect(renderContentSpy).toHaveBeenCalledWith(
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
  });

  it('does not call renderContent by default', () => {
    const renderTriggerSpy = jest.spyOn(props, 'renderContent');
    shallow(<Popup {...props} />);

    expect(renderTriggerSpy).not.toHaveBeenCalledWith();
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
      const renderContentSpy = jest.spyOn(props, 'renderTrigger');
      shallow(<Popup {...props} />);

      expect(renderContentSpy).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          isVisible: true,
        })
      );
    });

    it('renders Portal', () => {
      const wrapper = shallow(<Popup {...props} />);

      expect(wrapper.find(Portal)).toExist();
    });

    it('calls on renderContent and passes some internal methods', () => {
      const renderContentSpy = jest.spyOn(props, 'renderContent');
      const wrapper = shallow(<Popup {...props} />);
      // @ts-ignore
      const { showPopup, hidePopup } = wrapper.instance();

      expect(renderContentSpy).toHaveBeenCalledWith(
        {},
        {
          showPopup,
          hidePopup,
          isVisible: true,
          isOver: false,
        }
      );
    });

    it('repaints the popup when props change', () => {
      const wrapper = shallow(<Popup {...props} />);
      const repaintSpy = jest.spyOn(wrapper.instance() as any, 'repaint');

      wrapper.setProps({ padding: 10 });
      expect(repaintSpy).toHaveBeenCalled();
    });
  });
});
