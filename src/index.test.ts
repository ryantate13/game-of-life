import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import '.';

jest.mock('react-dom', () => ({
    render: jest.fn(),
}));

jest.mock('./serviceWorker', () => ({
    register: jest.fn(),
}));

describe('index', () => {
    it('renders the app into the DOM', () => {
        expect(ReactDOM.render).toHaveBeenCalled();
    });
    it('registers a service worker', () => {
        expect(serviceWorker.register).toHaveBeenCalled();
    });
});
