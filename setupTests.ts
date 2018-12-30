const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
jest.mock('react');
jest.mock('lodash');
jest.mock('lodash/debounce');
jest.mock('react-contextmenu');
jest.mock('use-resize-observer');
jest.mock('react-window');
