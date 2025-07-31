import React, { useEffect, useState } from 'react';
import { Line } from './components/Line';
import words from '../words.json';

export const App: React.FC = () => {

  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [notAWord, setNotAWord] = useState(false);
  const [error, setError] = useState('');

  const playAgain = () => {
    fetchWord();
    setGuesses(Array(6).fill(null));
    setCurrentGuess('');
    setIsGameOver(false);
    setIsWin(false)
  }

  useEffect(() => {
    const handleType = (e) => {

      if(isGameOver){
        return;
      }

      if(e.key === 'Enter'){
        if(!words.includes(currentGuess.toLowerCase())){
          setNotAWord(true);
          setError('Not a word');
          return;
        } 
        setNotAWord(false);
        if(currentGuess.length !== 5){
          return;
        }

        const newGuesses = [...guesses];
        if(newGuesses.includes(currentGuess)){
          setNotAWord(true);
          setError('Word already typed');
          return
        }
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('')

        const isCorrect = solution === currentGuess;
        if(isCorrect){
          setIsGameOver(true);
          setIsWin(true);
        } else if(!isCorrect && guesses.filter((guess) => guess !== null).length === 5 ){
          setIsGameOver(true);
        }
      }

      if(e.key === 'Backspace'){
        setCurrentGuess(currentGuess.slice(0, -1));
        setNotAWord(false)
        return
      }

      if(currentGuess.length >= 5){
        return
      }

      const isLetter = e.key.match(/^[a-z]{1}$/) !== null;
      if(isLetter){
        setCurrentGuess(currentGuess + e.key)
      }
    };

    window.addEventListener('keydown', handleType);

    return () => window.removeEventListener('keydown', handleType)
  }, [currentGuess, isGameOver, solution, guesses])

  const fetchWord = async () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord.toLowerCase());
  }

  useEffect(() => {
    fetchWord();
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>WORDLE</h1>
        <ul>
          <li>Green for correct character and position guess</li>
          <li>Yellow for correct character guess</li>
          <li>Grey for incorrect character guess</li>
        </ul>
      </div>

      { notAWord ? <div className='not-a-word'>{error}</div> : null}

      <div className='board'>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex(val => val == null);
          return <Line 
                  key={i}
                  guess = {isCurrentGuess ? currentGuess  : guess ?? ''}
                  isFinal = {!isCurrentGuess && guess != null}
                  solution = {solution}
                  />
        }) }
      </div>

      {isGameOver && (
        <div className="result">
          <h1 className={isWin ? "you_win" : "you_loose"}>
            {isWin ? "YOU WIN" : `YOU LOSE, The answer is ${solution}`}
          </h1>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}

    </div>
  )
}
