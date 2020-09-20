import React from 'react';
import {render} from '@testing-library/react';
import {GLIDER, init, to_xy, neighbors, generation, Game, dispatch_dimensions, draw_canvas} from './Game';
import {Cells} from './App';

describe('GLIDER', () => {
    it('represents a glider pattern placed in the middle of 25x25 cell universe', () => {
        expect(GLIDER.length).toBe(25);
        expect(GLIDER.every(row => row.length === 25)).toBe(true);
    });
});

describe('init', () => {
    it('creates an initial board for the game comprised of centered gliders in 25x25 cell regions', () => {
        const new_board = init({height: 25, width: 25});
        for(const coordinate of new_board){
            const [x, y] = to_xy(coordinate);
            expect(GLIDER[y][x]).toBeTruthy();
        }
    });
    it('creates multiple gliders in 25x25 regions if the board size is larger than 25x25', () => {
        const number_of_coordinates_in_glider = GLIDER
            .reduce((a, b) => a+b)
            .split('')
            .filter(c => c.trim())
            .length;
        for(const multiplier of [2, 3, 4, 5]){
            const board = init({height: 25 * multiplier, width: 25 * multiplier});
            expect(board.size).toEqual(number_of_coordinates_in_glider * multiplier ** 2);
        }
    });
});

describe('to_xy', () => {
    it('deserializes a coordinate into an X,Y pair', () => {
        const expected = [1, 2];
        expect(to_xy(expected.toString())).toEqual(expected);
    });
});

describe('neighbors', () => {
    it('gets the neighbors of a cell', () => {
        expect(neighbors(0, 0, 4, 4)).toEqual([
            [0, 1],
            [1, 0],
            [1, 1],
        ]);
        expect(neighbors(1, 0, 4, 4)).toEqual([
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
        ]);
        expect(neighbors(1, 1, 4, 4)).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2],
        ]);
        expect(neighbors(0, 1, 4, 4)).toEqual([
            [0, 0],
            [0, 2],
            [1, 0],
            [1, 1],
            [1, 2],
        ]);
        expect(neighbors(3, 3, 4, 4)).toEqual([
            [2, 2],
            [2, 3],
            [3, 2],
        ]);
    });
});

const still_lifes: Record<string, string[]> = {
    block: [
        '    ',
        ' ■■ ',
        ' ■■ ',
        '    ',
    ],
    beehive: [
        '      ',
        '  ■■  ',
        ' ■  ■ ',
        '  ■■  ',
        '      ',
    ],
    loaf: [
        '      ',
        '  ■■  ',
        ' ■  ■ ',
        '  ■ ■ ',
        '   ■  ',
        '      ',
    ],
    boat: [
        '     ',
        ' ■■  ',
        ' ■ ■ ',
        '  ■  ',
        '     ',
    ],
    tub: [
        '     ',
        '  ■  ',
        ' ■ ■ ',
        '  ■  ',
        '     ',
    ],
};

const oscillators: Record<string, string[][]> = {
    blinker: [
        [
            '     ',
            '  ■  ',
            '  ■  ',
            '  ■  ',
            '     ',
        ],
        [
            '     ',
            '     ',
            ' ■■■ ',
            '     ',
            '     ',
        ],
    ],
    toad: [
        [
            '      ',
            '      ',
            '  ■■■ ',
            ' ■■■  ',
            '      ',
            '      ',
        ],
        [
            '      ',
            '   ■  ',
            ' ■  ■ ',
            ' ■  ■ ',
            '  ■   ',
            '      ',
        ],
    ],
    beacon: [
        [
            '      ',
            ' ■■   ',
            ' ■■   ',
            '   ■■ ',
            '   ■■ ',
            '      ',
        ],
        [
            '      ',
            ' ■■   ',
            ' ■    ',
            '    ■ ',
            '   ■■ ',
            '      ',
        ],
    ],
};

const spaceships: Record<string, string[][]> = {
    glider: [
        [
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
        ],
        [
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
            '           ■ ■           ',
            '            ■■           ',
            '            ■            ',
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
        ],
        [
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
            '             ■           ',
            '           ■ ■           ',
            '            ■■           ',
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
        ],
        [
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
            '            ■            ',
            '             ■■          ',
            '            ■■           ',
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
        ],
        [
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
            '             ■           ',
            '              ■          ',
            '            ■■■          ',
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
        ],
    ],
};

function to_cells(board: string[]): Cells {
    const cells: Cells = {
        alive: new Set(),
        dying: new Set(),
    };
    for (const [y, col] of Object.entries(board)) {
        for (const [x] of Object.keys(col)) {
            //@ts-expect-error
            if (board[y][x].trim()) {
                cells.alive.add([x, y].toString());
            }
        }
    }
    return cells;
}

describe('generation', () => {
    it('processes the next tick of a game of life board', () => {
        for (const still_life of Object.values(still_lifes)) {
            const cells = to_cells(still_life);
            expect(generation(cells.alive, still_life[0].length, still_life.length)).toEqual(cells);
        }
        for (const oscillator of Object.values(oscillators)) {
            const [phase_1, phase_2] = oscillator.map(to_cells),
                [reference_1, reference_2] = [phase_1, phase_2].map(phase => new Set([...phase.alive])),
                width = oscillator[0][0].length,
                height = oscillator[0].length;
            expect(generation(phase_1.alive, width, height).alive).toEqual(reference_2);
            expect(generation(phase_2.alive, width, height).alive).toEqual(reference_1);
        }
        for (const spaceship of Object.values(spaceships)) {
            const rendered = spaceship.map(to_cells),
                reference = spaceship.map(to_cells),
                width = spaceship[0][0].length,
                height = spaceship[0].length;
            for (let i = 0; i < spaceship.length - 1; ++i) {
                expect(generation(rendered[i].alive, width, height).alive).toEqual(reference[i + 1].alive);
            }
        }
    });
});

describe('Game', () => {
    it('renders a game universe to an HTML canvas', () => {
        const dispatch = jest.fn();
        const {container} = render(<Game
            dispatch={dispatch}
            dimensions={{
                height: 25,
                width: 25,
            }}
            cells={{
                alive: new Set(),
                dying: new Set(),
            }}
            zoom={1}
        />);
        expect(container.querySelector('div')).toBeTruthy();
        expect(container.querySelector('canvas')).toBeTruthy();
    });
});

describe('dispatch_dimensions', () => {
    it(`dispatches the dimensions of the canvas' wrapper div`, () => {
        const dispatch = jest.fn();
        //@ts-expect-error
        dispatch_dimensions(null, dispatch);
        expect(dispatch).not.toHaveBeenCalled();
        dispatch_dimensions({
            current: document.createElement('div'),
        }, dispatch);
        expect(dispatch).toHaveBeenCalled();
    });
});

describe('draw_canvas', () => {
    it('takes the current game state and renders it to an html canvas element', () => {
        const canvas = document.createElement('canvas'),
            width = 2,
            height = 2,
            alive = new Set(['0,0']),
            dying = new Set(['1,1']);
        //@ts-expect-error
        canvas.getContext.mockClear();
        //@ts-expect-error
        draw_canvas(null, width, height, alive, dying);
        expect(canvas.getContext).not.toHaveBeenCalled();
        draw_canvas({
            current: canvas,
        }, width, height, alive, dying);
        expect(canvas.getContext).toHaveBeenCalled();
        const ctx = canvas.getContext('2d');
        //@ts-expect-error
        canvas.getContext.mockClear();
        draw_canvas({
            current: canvas,
        }, width, height, new Set(), new Set());
        //@ts-expect-error
        expect(ctx.fillStyle).toBe('#fff');
        //@ts-expect-error
        expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, width, height);
        //@ts-expect-error
        canvas.getContext.mockClear();
        //@ts-expect-error
        ctx.fillRect.mockClear();
        draw_canvas({
            current: canvas,
        }, width, height, new Set(['0,0']), new Set());
        //@ts-expect-error
        expect(ctx.fillStyle).toBe('#000');
        //@ts-expect-error
        expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 1, 1);
    });
});
