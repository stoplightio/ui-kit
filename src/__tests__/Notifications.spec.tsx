import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Icon, IconLibrary } from '../Icon';
import { Notifications } from '../Notifications';
import { NotificationType, Toast } from '../Toast';

describe('Notifications', () => {
  beforeAll(() => {
    const { fas } = _solidIcons;
    IconLibrary.add(fas);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Notifications
        notifications={[
          {
            title: 'Title',
            body: 'Body',
            type: NotificationType.INFO,
          },
          {
            title: 'Title',
            body: 'Body',
            type: NotificationType.INFO,
          },
        ]}
      />
    );

    expect(wrapper.find(Toast)).toHaveLength(2);
  });

  it('emits close events', () => {
    const onClose = jest.fn();
    const notifications = [
      {
        title: 'Title',
        body: 'Body',
        type: NotificationType.INFO,
      },
      {
        title: 'Title',
        body: 'Body',
        type: NotificationType.INFO,
      },
    ];

    const wrapper = shallow(<Notifications notifications={notifications} onClose={onClose} />);
    wrapper
      .find(Toast)
      .first()
      .simulate('close', notifications[0]);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith([notifications[0]]);

    wrapper
      .find(Icon)
      .at(2)
      .simulate('click');
    expect(onClose).toHaveBeenCalledWith(notifications);
  });
});
