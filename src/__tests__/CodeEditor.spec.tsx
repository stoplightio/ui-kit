import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import { CodeEditor } from '../CodeEditor';

describe('CodeEditor', () => {
  let useStateSpy: jest.SpyInstance;
  let setValueMock: jest.Mock;

  beforeEach(() => {
    useStateSpy = jest.spyOn(React, 'useState');

    setValueMock = jest.fn();
    useStateSpy.mockReturnValueOnce(['', setValueMock]);
  });

  afterEach(() => {
    useStateSpy.mockRestore();
  });

  it('calls onChange on code change', () => {
    const onChange = jest.fn();
    const newCode = 'abcdef';

    const wrapper = mount(<CodeEditor onChange={onChange} language="js" />);

    wrapper.find(Editor).prop('onValueChange')(newCode);
    expect(onChange).toHaveBeenCalledWith(newCode);
    wrapper.unmount();
  });

  it('update value on code change', () => {
    const newCode = 'abcdef';

    const wrapper = mount(<CodeEditor onChange={() => null} language="js" />);

    wrapper.find(Editor).prop('onValueChange')(newCode);
    expect(setValueMock).toHaveBeenCalledWith(newCode);
    wrapper.unmount();
  });

  it('supports controlled mode', () => {
    const newCode = 'foobar';
    const wrapper = mount(<CodeEditor onChange={() => null} language="js" value="test" />);

    wrapper.setProps({ value: newCode });

    expect(wrapper.find(Editor)).toHaveProp('value', newCode);
    wrapper.unmount();
  });
});
