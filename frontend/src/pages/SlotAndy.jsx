import '../SlotAndy.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import { get_symbol_image, creditCost, returnPointsEarned } from '../exports/helper';
import MultiplierButtons from "../components/MultiplierButtons";


function SlotAndy() {
  const REELS = 5;
  const {
    useState,
    useEffect,
    useRef,
    useCallback,
    forwardRef,
    useImperativeHandle,
  } = React;

  const ICON_HEIGHT = 188;
  const LOSER_MESSAGES = [
    "Not quite",
    "Stop gambling",
    "Hey, you lost!",
    "Ouch! I felt that",
    "Don't beat yourself up",
    "There goes the college fund",
    "I have a cat. You have a loss",
    "You're awesome at losing",
    "Coding is hard",
    "Don't hate the coder",
  ];


  const PlayButton = ({ onClick }) => (
    <button className="casino-play-btn" onClick={onClick}>
      PLAY
    </button>
  )

  const WinningSound = () => (
    <audio autoPlay className="player" preload="none">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );

  // 1
  // 2
  // 3
  // a column with 3 rows
  const Spinner = forwardRef(({ onFinish, timer, goldSymbols}, ref) => {
    const GOLD_PRIORTY = ["coins", "bao", "tree", "boat", "chingling"];
    const goldSymbolsRef = useRef(goldSymbols) // ref to stop rerender image if gold symbol changed
    // common 50%
    // uncommon 25%
    // rare 15%
    // epic? 10%
    const SYMBOL_KEYS = [
      "ten","coins","bao","tree","boat","chingling",
      "symbol_a","symbol_j","symbol_k","symbol_q",
      "fu","drums","nine"
    ];

    const getRandomImages = () => {
      return Array.from({length: 3}, () => 
        SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)]
      )
    }
    const [symbols, setSymbols] = useState(getRandomImages);
    const symbolsRef = useRef(symbols);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);


    const spinOnce = () => {
      // display random symbol out of 13 (later will change probabilities of each symbol)
      // common to rare: coins, bao, tree, boat, chingling
      const newSymbols = getRandomImages();

      symbolsRef.current = newSymbols; // keep latest
      setSymbols(newSymbols);
    };

    const reset = () => {
      // clear any previous spin
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);

      // start spinning, change symbol every 100ms
      intervalRef.current = setInterval(spinOnce, 100);

      // keep gold symbols for this spin
      goldSymbolsRef.current = goldSymbols;

      // stop spinning after timer
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        onFinish?.(symbolsRef.current);
      }, timer);
    };

    useImperativeHandle(ref, () => ({ reset }));

    return (
      <div className="spinner-column">
        {symbols.map((symbolKey, i) => (
          <img
            key={i}
            src={get_symbol_image(symbolKey, GOLD_PRIORTY.indexOf(symbolKey) < goldSymbolsRef.current)} 
            style={{ width: 188, height: 188, display: "block" }}
            alt={symbolKey}
          />
        ))}
      </div>
    );
  });


  const SlotMachine = () => {
    // everyone starts with 100 dollars aka 10000 credits, 1 credit is 1c
    const [credits, setCredits] = useState(10000);
    const REELS = 5;
    // references to the _ _ _ _ _ columns , useref does not cause a rerender
    const spinnerRefs = useRef(Array(REELS).fill(null));
    const resultsRef = useRef(Array(REELS).fill(null));
    // which symbols are gold
    const [goldSymbols, setGoldSymbols] = useState(5);
    // credits earned from spin
    const [win, setWin] = useState(0); // i want if its 0 to just show nothing TODO
    const [winWays, setwinWays] = useState([]); // like 24 ways win 4800 and 3 way 15 it will be [[24,4800],[3, 15]]
    const [winWaysIndex, setWinWaysIndex] = useState(0);

    // multipler selection, 1x (default), 2x, 3x, 4x, 5x(max)
    const [multiplier, setMultiplier] = useState(1);
    const [multiplierConst, setMultiplierConst] = useState(1);

    // helper function to log what symbols were rolled
    const handleFinish = (reelIndex, symbols) => {
      resultsRef.current[reelIndex] = symbols;

      // check if all reels are done
      const done = resultsRef.current.every(Boolean); // is every element truthy
      // might move this to a helper function TODO
      // TODO deal with the issue if fu is in the first column
      if (done) {
        console.log(resultsRef.current);
        // let returnedWinArray = return_array_of_wins(resultsRef.current, goldSymbols);
        let returnedWinArray = returnPointsEarned(resultsRef.current, goldSymbols);
        let finalWin = 0;
        for (let i = 0; i < returnedWinArray.length; i++) {
          finalWin += returnedWinArray[i][1];
        }
        console.log(`${returnedWinArray} returned win array, ${finalWin} finalwin`);
        setwinWays(returnedWinArray);
        setWin(finalWin);

        // times multiplier 
        setWin(multiplier * finalWin);
        resultsRef.current = Array(REELS).fill(null); // reset
      }
    };

    // helper to handle respinning each column when <play> is pressed
    const handleClick = () => {
      // clear win ways 
      setwinWays([]); // reset safely
      // set win back to 0
      setWin(0);

      // update old multiplier 
      setMultiplierConst(multiplier);
      // credits are added when new spin is done
      setCredits(credits - multiplier * creditCost(goldSymbols) + win);
      spinnerRefs.current.forEach(spinner => spinner?.reset());
    };


    // loop through different ways and pay
    useEffect(() => {
      if (winWays.length === 0) {
        setWinWaysIndex(0); // reset safely
        return;
      }
      const interval = setInterval(() => {
        setWinWaysIndex(prev => {
          return (prev + 1) % winWays.length;
        });
      }, 1500) // changes every 1.5 secs
      return () => clearInterval(interval);
    }, [winWays.length]);


    return (
      <div className="slot-machine">

        {/* SPINNERS */}
        <div className="spinner-container">
          {Array.from({ length: REELS }).map((_, index) => (
            <Spinner
              key={index}
              timer={1000 + index * 300}
              goldSymbols={goldSymbols}
              onFinish={(symbols) => handleFinish(index, symbols)}
              ref={el => (spinnerRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* PLAY BUTTON */}
        <div className="play-button-wrapper">

        {/* credit ways container */}
          <div className="credit-ways-container">
            {winWays.length > 0 && 
              <span className="what-ways-pay-number" style={{ color: "white" }}>
                {winWays[winWaysIndex][0]} ways pay {winWays[winWaysIndex][1] * multiplierConst}
              </span>
            }

            <div className="credits-wrapper">
              <div className='credits-container'>
                ${(credits / 100).toFixed(2)}
              </div>

              <span className='credits-container-text'>CASH</span>
            </div>
            
          </div>
            
          <div className='win-container'>
            <div className='win-container-inner'>
              <span className='win-text'>{win}</span>
            </div>
            <span className='win-on-border'>WIN</span>

          </div>

          <button className="play-btn" onClick={handleClick}>
            PLAY
          </button>

        </div>

        {/* MULTIPLIER / GOLD SELECTORS */}
        <MultiplierButtons
          goldSymbols={goldSymbols}
          setGoldSymbols={setGoldSymbols}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
        />

        <div className='bottom-right-credits'>{multiplier * creditCost(goldSymbols)}¢</div>

      </div>
    );
  };


  return (
    <div className="slot-page">
      <SlotMachine />
    </div>
  );

}

export default SlotAndy;

