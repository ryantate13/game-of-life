import React from 'react';

const logo = `#
          
          
          
      **  
  **** ** 
  ******  
   ****   
          
          
              
#`.replace('#\n', '').replace('\n#', ''),
    rows = logo.split('\n');

const white = '#fff',
    black = '#000',
    stroke = 'rgba(0,0,0,0.75)',
    strokeWidth = 1,
    dimension = 250,
    pixel_size = dimension / rows.length;

export function Logo() {
    return <svg viewBox={`0 0 ${dimension} ${dimension}`}>
        {rows.map((row, i) => row.split('').map((pixel, j) => <rect {...{
            key: `${i}${j}`,
            width: pixel_size,
            height: pixel_size,
            x: j * pixel_size,
            y: i * pixel_size,
            fill: pixel.trim() ? black : white,
            strokeWidth,
            stroke,
        }}/>))}
    </svg>;
}
