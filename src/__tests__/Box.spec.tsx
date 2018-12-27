/* @jsx jsx */

import { jsx } from '@emotion/core';
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';

import { Box, Image } from '../';

describe('Box component', () => {
  it('forwards refs', () => {
    const ref = jest.fn();
    const wrapper = mount(<Box ref={ref} />);
    expect(ref).toHaveBeenLastCalledWith(expect.any(Object));
    wrapper.unmount();
  });

  it('passes all props but hidden and responsive', () => {
    const props = {
      alt: 'example',
      src: 'example.com',
      hidden: false,
      responsive: true,
    };

    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toHaveProp({
      alt: props.alt,
      src: props.src,
    });

    expect(wrapper).not.toHaveProp('hidden');
    expect(wrapper).not.toHaveProp('responsive');
  });

  it('always renders img', () => {
    const wrapper = shallow(<Image as="h3" />);
    expect(wrapper).toHaveProp('as', 'img');
  });

  describe('styles', () => {
    it('hides image when hidden is true', () => {
      const wrapper = shallow(<Image hidden />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ display: 'none' }]));
    });

    it('sets responsive dimension when responsive is true', () => {
      const wrapper = shallow(<Image responsive />);
      expect(wrapper).toHaveProp(
        'css',
        expect.arrayContaining([
          {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          },
        ])
      );
    });
  });
});
