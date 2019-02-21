import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
import { Editor } from '../Editor';

describe('Code Editor component', () => {
  it('calls onChange on code change', () => {
    const onChange = jest.fn();
    const newCode = 'abcdef';

    const wrapper = mount(<Editor onChange={onChange} language="js" value="code" />);

    wrapper.find(ReactSimpleCodeEditor).prop('onValueChange')(newCode);
    expect(onChange).toHaveBeenCalledWith(newCode);
    wrapper.unmount();
  });

  it('passes down current value to Editor', () => {
    const newCode = 'foobar';
    const wrapper = mount(<Editor onChange={() => null} language="js" value="test" />);

    wrapper.setProps({ value: newCode });

    expect(wrapper.find(Editor)).toHaveProp('value', newCode);
    wrapper.unmount();
  });
});
