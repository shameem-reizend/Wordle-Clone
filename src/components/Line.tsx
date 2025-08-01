import React from 'react';

interface LinePropTypes{
    guess: string;
    isFinal: boolean;
    solution: string;
}

const WORD_LENGTH = 5

export const Line: React.FC<LinePropTypes> = ({ guess, isFinal, solution }) => {

    const tiles = [];

    for(let i = 0; i < WORD_LENGTH; i++){
        const char = guess[i];
        let className = 'tile';
        if(isFinal){
            if(char === solution[i]){
                className += ' flip correct';
            } else if(solution.includes(char)){
                className += ' role close'
            } else{
                className += ' pop incorrect'
            }
        }

        tiles.push(
            <div key={i} className={className}>
                {char}
            </div>
        )
    }

  return (
    <div className='line'>
        {tiles}
    </div>
  )
}
