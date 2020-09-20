import React, {useEffect, useRef} from 'react';
import styles from './Game.module.scss';
import {Event, Cells, Dimensions, Coordinates} from './App';
import {Dispatcher} from './useDispatch';

/**
 * TODO
 * Write a function that renders this glider onto a board of arbitrary size
 */
export const GLIDER: string[] = [
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '            ■            ',
    '             ■           ',
    '           ■■■           ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
    '                         ',
];

type Props = {
    dispatch: Dispatcher<Event>;
    dimensions: Dimensions;
    cells: Cells;
    zoom: number;
}

type XY = [number, number];

export function to_xy(c: Coordinates): XY {
    return c.split(',').map(Number) as XY;
}

export function neighbors(x: number, y: number, width: number, height: number): XY[] {
    const neighbs: XY[] = [],
        max_x = Math.min(x + 1, width - 1),
        max_y = Math.min(y + 1, height - 1);
    for (let _x = Math.max(0, x - 1); _x <= max_x; ++_x)
        for (let _y = Math.max(0, y - 1); _y <= max_y; ++_y)
            if (!(_x === x && _y === y))
                neighbs.push([_x, _y]);
    return neighbs;
}

export function generation(cells: Set<Coordinates>, width: number, height: number): Cells {
    const dying = new Set<string>(),
        new_cells = new Set<string>();
    for (const c of cells) {
        const [x, y] = to_xy(c),
            surrounding = neighbors(x, y, width, height),
            {alive, dead} = surrounding.reduce((a: { dead: XY[], alive: XY[] }, c: XY) => {
                a[cells.has(c.toString()) ? 'alive' : 'dead'].push(c);
                return a;
            }, {dead: [], alive: []});
        for (const dead_cell of dead) {
            const live_neighbors = neighbors(dead_cell[0], dead_cell[1], width, height)
                .filter(n => cells.has(n.toString()));
            if (live_neighbors.length === 3)
                new_cells.add(dead_cell.toString());
        }
        if (alive.length !== 2 && alive.length !== 3) {
            dying.add(c);
        }
    }
    for (const d of dying)
        cells.delete(d);
    for (const n of new_cells)
        cells.add(n);
    return {alive: cells, dying};
}

export function dispatch_dimensions(ref: React.MutableRefObject<HTMLDivElement | null>, dispatch: Dispatcher<Event>) {
    if (ref && ref.current) {
        const {width, height} = (ref.current as unknown as HTMLDivElement).getBoundingClientRect();
        dispatch({
            type: 'dimensions',
            height,
            width,
        });
    }
}

export function draw_canvas(
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    width: number,
    height: number,
    alive: Set<Coordinates>,
    dying: Set<Coordinates>
) {
    if (canvas && canvas.current) {
        const ctx = (canvas.current as unknown as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D,
            fill_with = (color: 'white' | 'black', coordinates: Set<Coordinates>): void => {
                ctx.fillStyle = color;
                for (const coordinate of coordinates) {
                    const [x, y] = to_xy(coordinate);
                    ctx.fillRect(x, y, 1, 1);
                }
            };
        if (!alive.size && !dying.size) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
        }
        else {
            fill_with('white', dying);
            fill_with('black', alive);
        }
    }
}

export function Game({dispatch, dimensions: {height, width}, cells: {alive, dying}, zoom}: Props) {
    const container_ref = useRef(null);
    useEffect(() => {
        dispatch_dimensions(container_ref, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container_ref]);

    const canvas_ref: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    useEffect(() => {
        draw_canvas(canvas_ref, width, height, alive, dying);
    }, [canvas_ref, width, height, alive, dying]);

    return <div className={styles.board} ref={container_ref}>
        <canvas ref={canvas_ref} {...{height, width}} style={{zoom}}/>
    </div>;
}
