import React, { useEffect, useState } from 'react';
import { Line } from './assets/components/Line';

const words = ["ALBUM","HINGE","ERASE","BRIDE","BROKE","SLATE","PLATE","GRIND","MONEY","SCRAP","GAMER","HELLO","GLASS","SCOUR","BEING","DELVE","YIELD","METAL","TIPSY","SLUNG","FARCE","GECKO","SHINE","CANNY","MIDST","BADGE","HOMER","TRAIN","STORY","HAIRY","FORGO","LARVA","TRASH","ZESTY","SHOWN","HEIST","ASKEW","INERT","OLIVE","PLANT","OXIDE","CARGO","FOYER","FLAIR","AMPLE","CHEEK","SHAME","MINCE","CHUNK","ROYAL","SQUAD","BLACK","STAIR","SCARE","FORAY","COMMA","NATAL","SHAWL","FEWER","TROPE","SNOUT","LOWLY","STOVE","SHALL","FOUND","NYMPH","EPOXY","DEPOT","CHEST","PURGE","SLOSH","THEIR","RENEW","ALLOW","SAUTE","MOVIE","CATER","TEASE","SMELT","FOCUS","TODAY","WATCH","LAPSE","MONTH","SWEET","HOARD","CLOTH","BRINE","AHEAD","MOURN","NASTY","RUPEE","CHOKE","CHANT","SPILL","VIVID","BLOKE","TROVE","THORN","OTHER","TACIT","SWILL","DODGE","SHAKE","CAULK","AROMA","CYNIC","ROBIN","ULTRA","ULCER","PAUSE","HUMOR","FRAME","ELDER","SKILL","ALOFT","PLEAT","SHARD","MOIST","THOSE","LIGHT","WRUNG","COULD","PERKY","MOUNT","WHACK","SUGAR","KNOLL","CRIMP","WINCE","PRICK","ROBOT","POINT","PROXY","SHIRE","SOLAR","PANIC","TANGY","ABBEY","FAVOR","DRINK","QUERY","GORGE","CRANK","SLUMP","BANAL","TIGER","SIEGE","TRUSS","BOOST","REBUS","UNIFY","TROLL","TAPIR","ASIDE","FERRY","ACUTE","PICKY","WEARY","GRIPE","CRAZE","PLUCK","BRAKE","BATON","CHAMP","PEACH","USING","TRACE","VITAL","SONIC","MASSE","CONIC","VIRAL","RHINO","BREAK","TRIAD","EPOCH","USHER","EXULT","GRIME","CHEAT","SOLVE","BRING","PROVE","STORE","TILDE","CLOCK","WROTE","RETCH","PERCH","ROUGE","RADIO","SURER","FINER","VODKA","HERON","CHILL","GAUDY","PITHY","SMART","BADLY","ROGUE","GROUP","FIXER","GROIN","DUCHY","COAST","BLURT","PULPY","ALTAR","GREAT","BRIAR","CLICK","GOUGE","WORLD","ERODE","BOOZY","DOZEN","FLING","GROWL","ABYSS","STEED","ENEMA","JAUNT","COMET","TWEED","PILOT","DUTCH","BELCH","OUGHT","DOWRY","THUMB","HYPER","HATCH","ALONE","MOTOR","ABACK","GUILD","KEBAB","SPEND","FJORD","ESSAY","SPRAY","SPICY","AGATE","SALAD","BASIC","MOULT","CORNY","FORGE","CIVIC","ISLET","LABOR","GAMMA","LYING","AUDIT","ROUND","LOOPY","LUSTY","GOLEM","GONER","GREET","START","LAPEL","BIOME","PARRY","SHRUB","FRONT","WOOER","TOTEM","FLICK","DELTA","BLEED","ARGUE","SWIRL","ERROR","AGREE","OFFAL","FLUME","CRASS","PANEL","STOUT","BRIBE","DRAIN","YEARN","PRINT","SEEDY","IVORY","BELLY","STAND","FIRST","FORTH","BOOBY","FLESH","UNMET","LINEN","MAXIM","POUND","MIMIC","SPIKE","CLUCK","CRATE","DIGIT","REPAY","SOWER","CRAZY","ADOBE","OUTDO","TRAWL","WHELP","UNFED","PAPER","STAFF","CROAK","HELIX","FLOSS","PRIDE","BATTY","REACT","MARRY","ABASE","COLON","STOOL","CRUST","FRESH","DEATH","MAJOR","FEIGN","ABATE","BENCH","QUIET","GRADE","STINK","KARMA","MODEL","DWARF","HEATH","SERVE","NAVAL","EVADE","FOCAL","BLUSH","AWAKE","HUMPH","SISSY","REBUT","CIGAR"]

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
        if(!words.includes(currentGuess.toUpperCase())){
          setNotAWord(true);
          setError('Not a Word');
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
    console.log(randomWord);
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
                  guess = {isCurrentGuess ? currentGuess  : guess ?? ''}
                  isFinal = {!isCurrentGuess && guess != null}
                  solution = {solution}
                  />
        }) }
      </div>

      {isGameOver && (
        <div className="result">
          <h1 className={isWin ? "you_win" : "you_loose"}>
            {isWin ? "YOU WIN" : "YOU LOSE"}
          </h1>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}

    </div>
  )
}
