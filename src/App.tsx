import React from 'react';
import styles from './App.module.scss';
import {useDispatch, Dispatcher} from './useDispatch';
import {Header} from './Header';
import {Game, generation} from './Game';

type FPS = {
    type: 'frames_per_second';
    value: number;
}

type FillRate = {
    type: 'fill_rate';
    value: number;
};

type Play = {
    type: 'play';
}

type Pause = {
    type: 'pause';
};

type Random = {
    type: 'random';
};

type StartAnimation = {
    type: 'start_animation';
};

type Generate = {
    type: 'generate';
}

type GameDimensions = {
    type: 'dimensions';
    height: number;
    width: number;
};

type ApplyCells = {
    type: 'cells';
    cells: Set<Coordinates>;
};

export type Event = FPS | FillRate | Play | Pause | Random | StartAnimation | Generate | GameDimensions | ApplyCells;

export type Dimensions = {
    height: number;
    width: number;
};

export type Coordinates = string;

export type Cells = {
    alive: Set<Coordinates>;
    dying: Set<Coordinates>;
};

export type AppState = {
    generation: number;
    frames_per_second: number;
    fill_rate: number;
    paused: boolean;
    animation_id: NodeJS.Timeout | number;
    dimensions: Dimensions;
    cells: Cells;
    zoom: number;
};

export const initial_state = {
    generation: 0,
    frames_per_second: 60,
    fill_rate: 10,
    paused: true,
    animation_id: 0,
    dimensions: {
        height: 0,
        width: 0,
    },
    cells: {
        alive: new Set([]),
        dying: new Set([]),
    },
    zoom: 5,
};

export function reducer(state: AppState, event: Event, dispatch: Dispatcher<Event>): AppState {
    const schedule = () => {
        if (!state.paused)
            state.animation_id = setTimeout(() => dispatch({type: 'generate'}), 1000 / state.frames_per_second);
    };
    switch (event.type) {
        case 'fill_rate':
            state.fill_rate = event.value;
            break;
        case 'frames_per_second':
            state.frames_per_second = event.value;
            break;
        case 'play':
            state.paused = false;
            schedule();
            break;
        case 'pause':
            state.paused = true;
            clearTimeout(state.animation_id as NodeJS.Timeout);
            state.animation_id = 0;
            break;
        case 'random':
            state.generation = initial_state.generation;
            const cells = new Set<string>();
            for (let x = 0; x < state.dimensions.width; ++x)
                for (let y = 0; y < state.dimensions.height; ++y)
                    if (Math.random() > 1 - state.fill_rate / 100)
                        cells.add([x, y].toString());
            state.cells.dying = new Set();
            state.cells.alive = new Set();
            requestAnimationFrame(() => dispatch({type: 'cells', cells}));
            break;
        case 'cells':
            state.cells.alive = event.cells;
            break;
        case 'generate':
            // stop processing generations if the board is dead
            if (state.cells.alive.size) {
                ++state.generation;
                state.cells = generation(state.cells.alive, state.dimensions.width, state.dimensions.height);
                schedule();
            }
            break;
        case 'dimensions':
            state.dimensions.height = Math.floor(event.height / state.zoom);
            state.dimensions.width = Math.floor(event.width / state.zoom);
            break;
        default:
            console.error('unmatched event type', {event, state});
    }
    return {...state};
}

export function App() {
    const [state, dispatch] = useDispatch<AppState, Event>(initial_state, reducer);
    Object.assign(window, {state, dispatch});
    return <div className={styles.App}>
        <Header
            dispatch={dispatch}
            generation={state.generation}
            frames_per_second={state.frames_per_second}
            paused={state.paused}
            fill_rate={state.fill_rate}
        />
        <Game
            dispatch={dispatch}
            dimensions={state.dimensions}
            cells={state.cells}
            zoom={state.zoom}
        />
    </div>;
}
