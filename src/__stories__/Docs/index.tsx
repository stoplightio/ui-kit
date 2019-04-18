import { storiesOf } from '@storybook/react';
import Classes from './Classes';
import Namespaces from './Namespaces';
import Theme from './Theme';

storiesOf('Docs', module)
  .add('Classes', Classes)
  .add('Overwritting the Theme', Theme)
  .add('Multiple Namespaces', Namespaces);
