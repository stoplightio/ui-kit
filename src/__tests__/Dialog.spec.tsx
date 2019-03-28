import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Box } from '../Box';
import { IDialog } from '../Dialog';
import { IOverlay } from '../Overlay';
import { ITheme } from '../theme';

let useContextSpy: jest.SpyInstance;
describe('Dialog component', () => {
  let Overlay: React.FunctionComponent<IOverlay>;
  let Dialog: React.FunctionComponent<IDialog>;

  const theme: Partial<ITheme> = {
    overlay: {
      bg: 'red',
    },
    dialog: {
      bg: 'blue',
      fg: 'red',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));
    jest.mock('../Portal', () => {
      const fn = jest.fn(({ children }) => children);
      // @ts-ignore
      fn.displayName = 'Portal';
      return { Portal: fn };
    });

    useContextSpy = jest.spyOn(React, 'useContext').mockReturnValue({});

    ({ Overlay, Dialog } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
    jest.unmock('../Portal');

    useContextSpy.mockRestore();
  });

  it('should render nothing is show is falsy', () => {
    let wrapper = shallow(<Dialog />);
    expect(wrapper).toBeEmptyRender();

    wrapper = shallow(<Dialog show={false} />);
    expect(wrapper).toBeEmptyRender();
  });

  describe('when show is truthy', () => {
    let defaultProps: IDialog;

    beforeEach(() => {
      defaultProps = {
        show: true,
      };
    });

    it('renders Portal component', () => {
      const wrapper = shallow(<Dialog {...defaultProps} />);
      expect(wrapper).toMatchSelector('Portal');
    });

    it('does not attaches props other than children to top-level component', () => {
      const wrapper = shallow(<Dialog {...defaultProps} />);
      expect(wrapper.props()).toEqual({ children: expect.anything() });
    });

    it('renders Overlay above actual content', () => {
      const children = <span>foo</span>;
      const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>).shallow();
      expect(wrapper.find(Overlay)).toContainReact(children);
    });

    it('renders render actual content as Box', () => {
      const children = <span>foo</span>;
      const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>);
      const content = wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first()
        .shallow();

      expect(content).toMatchElement(<Box>{children}</Box>);
    });

    it('passes all props but show to actual content container', () => {
      const props = {
        width: '200px',
        height: '500px',
      };
      const children = <span>a</span>;

      const wrapper = shallow(
        <Dialog {...defaultProps} {...props}>
          {children}
        </Dialog>
      );
      const content = wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first();

      expect(content).toHaveProp(props);
      expect(content).toContainReact(children);
    });

    it('applies default styles based theme', () => {
      const wrapper = shallow(<Dialog {...defaultProps} />);
      const content = wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first();

      expect(content).toHaveProp(
        'css',
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: theme.dialog!.bg,
            color: theme.dialog!.fg,
          }),
          undefined,
        ])
      );

      expect(content).toHaveProp(
        'css',
        expect.not.arrayContaining([
          {
            border: `1px solid ${theme.dialog!.border}`,
          },
        ])
      );
    });

    it('applies border values if available in theme', () => {
      theme.dialog!.border = 'black';
      const wrapper = shallow(<Dialog {...defaultProps} />);
      const content = wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first();

      expect(content).toHaveProp(
        'css',
        expect.arrayContaining([
          expect.objectContaining({
            border: `1px solid ${theme.dialog!.border}`,
          }),
          undefined,
        ])
      );
    });

    it('dispatches onClickOutside when click happens on Overlay', () => {
      const onClickOutside = jest.fn();
      const wrapper = shallow(<Dialog {...defaultProps} onClickOutside={onClickOutside} />);
      const event = {};
      wrapper
        .shallow()
        .find(Overlay)
        .simulate('click', event);

      expect(onClickOutside).toHaveBeenCalledWith(event);
    });

    it('clicking on actual content should stop propagation', () => {
      const onOutsideClick = jest.fn();
      const wrapper = shallow(<Dialog {...defaultProps} onOutsideClick={onOutsideClick} />);
      const event = { stopPropagation: jest.fn() };
      wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first()
        .simulate('click', event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should re-trigger onClick', () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Dialog {...defaultProps} onClick={onClick} />);
      const event = { stopPropagation: jest.fn() };
      wrapper
        .shallow()
        .find(Overlay)
        .children()
        .first()
        .simulate('click', event);

      expect(onClick).toHaveBeenCalledWith(event);
    });
  });
});
