import React from 'react';
import {render} from '@testing-library/react';
import {useDispatch, Dispatcher, Reducer} from './useDispatch';

type TestHarness<S, E> = {
    state: S;
    dispatch: Dispatcher<E>;
}

function harness<S, E>(initial_state: S, reducer: Reducer<S, E>): TestHarness<S, E> {
    let test_harness: TestHarness<S, E> | null = null;

    function Test() {
        const [state, dispatch] = useDispatch(initial_state, reducer);
        test_harness = {state, dispatch};
        return null;
    }

    render(<Test/>);
    //@ts-expect-error
    return test_harness as TestHarness<S, E>;
}

type N = {
    n: number;
};

describe('useDispatch', () => {
    it('uses hooks to create a strongly typed redux in ~10 lines of code', () => {
        const initial_state = 0,
            reducer = (state: number) => state,
            {state, dispatch} = harness(initial_state, reducer);
        expect(state).toEqual(initial_state);
        expect(dispatch).toBeInstanceOf(Function);
        expect(dispatch.length).toBe(1);
    });
    it('supports synchronous state transformations', () => {
        const initial_state: N = {n: 0},
            reducer: Reducer<N, 'inc' | 'dec'> = (state, event) => {
                switch (event) {
                    case 'inc':
                        ++state.n;
                        break;
                    case 'dec':
                        --state.n;
                        break;
                }
                return state;
            };
        const {state, dispatch} = harness(initial_state, reducer);
        expect(state.n).toBe(0);
        dispatch('inc');
        expect(state.n).toBe(1);
        dispatch('dec');
        expect(state.n).toBe(0);
    });
    it('supports asynchronous state transformations', async () => {
        const expected = 1,
            actual = await new Promise(resolve => {
                const initial_state: null = null,
                    reducer: Reducer<null, 'get_async_value' | 'set_async_value'> = (state, event, dispatch) => {
                        switch (event) {
                            case 'get_async_value':
                                process.nextTick(() => dispatch('set_async_value'));
                                break;
                            case 'set_async_value':
                                resolve(expected);
                                break;
                        }
                        return state;
                    },
                    {dispatch} = harness(initial_state, reducer);
                dispatch('get_async_value');
            });
        expect(actual).toEqual(expected);
    });
});
