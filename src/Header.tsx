import React from 'react';
import {Event} from './App';
import {Dispatcher} from './useDispatch';
import {Logo} from './Logo';
import style from './Header.module.scss';

export type Props = {
    dispatch: Dispatcher<Event>;
    generation: number;
    frames_per_second: number;
    paused: boolean;
    fill_rate: number;
};

export function Header({generation, frames_per_second, paused, dispatch, fill_rate}: Props) {
    return <div className={style.panel}>
        <Logo/>
        <h1 className={style.h1}>Game of Life</h1>
        <div className={style.controls}>
            <h4>
                Controls
                <button disabled={!paused} onClick={() => dispatch({type: 'play'})} title={'Start'}>
                    <span role={'img'} aria-label={'play'}>▶</span>️
                </button>
                <button disabled={paused} onClick={() => dispatch({type: 'pause'})} title={'Pause'}>
                    <span role={'img'} aria-label={'pause'}>⏸</span>️
                </button>
                <button disabled={!paused} onClick={() => dispatch({type: 'random'})} title={'Generate Random Board'}>
                    <span role={'img'} aria-label={'random'}>↻</span>️
                </button>
            </h4>
            <h4>
                Frames Per Second
                <select
                    value={frames_per_second}
                    onChange={({target: {value}}) => dispatch({
                        type: 'frames_per_second',
                        value: Number(value),
                    })}
                >
                    {
                        Array(60)
                            .fill(null)
                            .map((_, i) => i + 1)
                            .filter(i => !(60 % i))
                            .map(i => <option key={i}>{i}</option>)
                    }
                </select>
            </h4>
            <h4>Generation: {generation}</h4>
            <h4>
                Fill Rate {fill_rate}%
                <input
                    disabled={!paused}
                    type={'range'}
                    min={10}
                    max={100}
                    step={10}
                    value={fill_rate}
                    onChange={({target: {value}}) => dispatch({type: 'fill_rate', value: Number(value)})}
                />
            </h4>
        </div>
    </div>;
}
