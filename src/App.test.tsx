jest.useFakeTimers();
import React from 'react';
import {render} from '@testing-library/react';
import {App, initial_state, reducer, AppState, Event} from './App';
import {useDispatch, Reducer} from './useDispatch';
import {Header} from './Header';
import {Game, generation, init} from './Game';

jest.mock('./useDispatch', () => ({
    //@ts-expect-error
    useDispatch: jest.fn((state: AppState, reducer: Reducer<AppState, Event>) => [state, state => state]),
}));

jest.mock('./Header', () => ({
    Header: jest.fn(() => null),
}));

jest.mock('./Game', () => ({
    Game: jest.fn(() => null),
    generation: jest.fn(() => ({
        alive: new Set(['0,0']),
        dying: new Set(['1,1']),
    })),
    init: jest.fn(() => new Set(['0,0'])),
}));

describe('App', () => {
    it('renders the root of the app', () => {
        const {container} = render(<App/>);
        expect(container).toBeInTheDocument();
        expect(Header).toHaveBeenCalled();
        expect(Game).toHaveBeenCalled();
        //@ts-expect-error
        expect(window.state).toBeTruthy();
        //@ts-expect-error
        expect(window.dispatch).toBeTruthy();
    });
    it('sets up initial state', () => {
        expect(useDispatch).toHaveBeenCalledWith(initial_state, reducer);
    });
});

describe('reducer', () => {
    window.requestAnimationFrame = jest.fn();
    window.console.error = jest.fn();

    const expected_number = 1234,
        setTimeout = window.setTimeout as unknown as jest.Mock<NodeJS.Timeout>,
        clearTimeout = window.clearTimeout as unknown as jest.Mock<void>,
        requestAnimationFrame = window.requestAnimationFrame as unknown as jest.Mock<number>;

    beforeAll(() => {
        setTimeout.mockImplementation(() => expected_number as unknown as NodeJS.Timeout);
        clearTimeout.mockImplementation(() => {});
    });

    it('handles state transformations for the app', () => {
        let scheduled_dispatch: () => void;

        const state: AppState = JSON.parse(JSON.stringify(initial_state)),
            dispatch = jest.fn();

        // fill_rate
        reducer(state, {type: 'fill_rate', value: expected_number}, dispatch);
        expect(state.fill_rate).toEqual(expected_number);

        // frames_per_second
        reducer(state, {type: 'frames_per_second', value: expected_number}, dispatch);
        expect(state.frames_per_second).toEqual(expected_number);

        // play
        reducer(state, {type: 'play'}, dispatch);
        expect(state.paused).toEqual(false);
        expect(setTimeout).toHaveBeenCalled();
        scheduled_dispatch = setTimeout.mock.calls[0][0];
        scheduled_dispatch();
        expect(dispatch).toHaveBeenCalled();
        setTimeout.mockClear();
        dispatch.mockClear();

        // pause
        reducer(state, {type: 'pause'}, dispatch);
        expect(state.paused).toEqual(true);
        expect(clearTimeout).toHaveBeenCalled();
        clearTimeout.mockClear();

        // random
        reducer({
            ...state,
            dimensions: {
                width: 1000,
                height: 1000,
            },
        }, {type: 'random'}, dispatch);
        expect(state.cells.alive.size).toEqual(0);
        expect(state.cells.dying.size).toEqual(0);
        expect(requestAnimationFrame).toHaveBeenCalled();
        scheduled_dispatch = requestAnimationFrame.mock.calls[0][0];
        scheduled_dispatch();
        expect(dispatch).toHaveBeenCalled();
        requestAnimationFrame.mockClear();
        dispatch.mockClear();
        jest.spyOn(Math, 'random').mockImplementation(() => -Infinity);
        reducer({
            ...state,
            dimensions: {
                width: 10,
                height: 10,
            },
        }, {type: 'random'}, dispatch);
        scheduled_dispatch = requestAnimationFrame.mock.calls[0][0];
        scheduled_dispatch();
        expect(dispatch).toHaveBeenCalled();
        const dispatched_event = dispatch.mock.calls[0][0];
        expect(dispatched_event.type).toBe('cells');
        expect(dispatched_event.cells.size).toBe(0);
        requestAnimationFrame.mockClear();
        dispatch.mockClear();

        // cells
        const s = new Set(['0,0'])
        reducer(state, {type: 'cells', cells: s}, dispatch);
        expect(state.cells.alive).toEqual(s);

        // generate
        reducer({
            ...state,
            cells: {
                alive: new Set(),
                dying: new Set(),
            },
        }, {type: 'generate'}, dispatch);
        expect(generation).not.toHaveBeenCalled();
        const post_generation_state = reducer({
            ...state,
            cells: {
                alive: new Set(['0,0']),
                dying: new Set(),
            },
        }, {type: 'generate'}, dispatch);
        expect(generation).toHaveBeenCalled();
        expect(post_generation_state.cells.alive.size).toBe(1);
        expect(post_generation_state.cells.dying.size).toBe(1);
        expect(post_generation_state.generation).toBe(1);

        // dimensions
        const {dimensions: {height, width}} = reducer(state, {
            type: 'dimensions',
            height: state.zoom,
            width: state.zoom,
        }, dispatch);
        expect(height).toEqual(1);
        expect(width).toEqual(1);
        expect(requestAnimationFrame).toHaveBeenCalled();
        const init_fn = requestAnimationFrame.mock.calls[0][0];
        init_fn();
        expect(init).toHaveBeenCalled();
        requestAnimationFrame.mockClear();

        // we should never arrive at this state
        //@ts-expect-error
        reducer({}, {});
        expect(console.error).toHaveBeenCalled();
    });
});
