import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { IImageProps, Image } from '../Image';

describe('Image', () => {
  let props: IImageProps;

  beforeEach(() => {
    props = {
      title: 'Stoplight.io',
      src: 'www.stoplight.io',
    };
  });

  it('attaches title', () => {
    const wrapper = mount(<Image {...props} />);
    expect(wrapper).toHaveProp('title', props.title);
    wrapper.unmount();
  });

  it('attaches src', () => {
    const wrapper = mount(<Image {...props} />);
    expect(wrapper).toHaveProp('src', props.src);
    wrapper.unmount();
  });
});
