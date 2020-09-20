import {useState} from 'react';

export type Reducer<S, E> = (state: S, event: E, dispatch: Dispatcher<E>) => S;
export type Dispatcher<E> = (event: E) => void;

export function useDispatch<S, E>(initial_state: S, reducer: Reducer<S, E>): [S, Dispatcher<E>] {
    const [state, setState] = useState<S>(initial_state);
    function dispatch(event: E){
        setState(current_state => reducer(current_state, event, dispatch));
    }
    return [state, dispatch];
}
