import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Header} from './Header';

describe('Header', () => {
    it('renders the controls for the game', () => {
        const dispatch = jest.fn();
        let {container, getByLabelText} = render(<Header
            dispatch={dispatch}
            generation={0}
            frames_per_second={0}
            paused={true}
            fill_rate={0}
        />);
        expect(container).toBeInTheDocument();
        //@ts-expect-error
        expect(container.querySelector('select').length).toBeTruthy();
        expect(
            [...container.querySelectorAll('select option')]
                .every(el => 60 % Number(el.innerHTML) === 0)
        ).toBe(true);
        expect(getByLabelText('play').parentElement).not.toBeDisabled();
        expect(getByLabelText('pause').parentElement).toBeDisabled();
        expect(getByLabelText('random').parentElement).not.toBeDisabled();
        for(const type of ['play', 'random']){
            getByLabelText(type).click();
            expect(dispatch).toHaveBeenCalledWith({type});
            dispatch.mockClear();
        }
        getByLabelText('pause').click();
        expect(dispatch).not.toHaveBeenCalled();
        dispatch.mockClear();
        //@ts-expect-error
        fireEvent.change(container.querySelector('select'), {target: {value: '1'}})
        expect(dispatch).toHaveBeenCalled();
        dispatch.mockClear();
        //@ts-expect-error
        fireEvent.change(container.querySelector('input[type=range]'), {target: {value: '1'}})
        expect(dispatch).toHaveBeenCalled();
        dispatch.mockClear();
    });
    it('selectively disables elements based on pause state', () => {
        const dispatch = jest.fn();
        let {getByLabelText} = render(<Header
            dispatch={dispatch}
            generation={0}
            frames_per_second={0}
            paused={false}
            fill_rate={0}
        />);
        expect(getByLabelText('play').parentElement).toBeDisabled();
        expect(getByLabelText('pause').parentElement).not.toBeDisabled();
        expect(getByLabelText('random').parentElement).toBeDisabled();
        getByLabelText('pause').click();
        expect(dispatch).toHaveBeenCalled();
        dispatch.mockClear();
    });
});
