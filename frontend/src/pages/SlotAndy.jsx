import '../SlotAndy.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import get_symbol_image from '../exports/helper';
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
  const Spinner = forwardRef(({ onFinish, timer }, ref) => {
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
            src={get_symbol_image(symbolKey, true)}
            style={{ width: 188, height: 188, display: "block" }}
            alt={symbolKey}
          />
        ))}
      </div>
    );
  });


  const SlotMachine = () => {
    const REELS = 5;
    // references to the _ _ _ _ _ columns , useref does not cause a rerender
    const spinnerRefs = useRef(Array(REELS).fill(null));
    // which symbols are gold
    const [goldSymbols, setGoldSymbols] = useState(5);

    // multipler selection, 1x (default), 2x, 3x, 4x, 5x(max)
    const [multiplier, setMultiplier] = useState(1);

    // helper function to log what symbols were rolled
    const handleFinish = (symbols) => {
      console.log("Reel finished:", symbols);
      // Here you can handle matches, winner logic, etc.
    };

    // helper to handle respinning each column when <play> is pressed
    const handleClick = () => {
      spinnerRefs.current.forEach(spinner => spinner?.reset());
    };

    return (
      <div className="slot-machine">

        {/* SPINNERS */}
        <div className="spinner-container">
          {Array.from({ length: REELS }).map((_, index) => (
            <Spinner
              key={index}
              timer={1000 + index * 300}
              goldSymbols={goldSymbols}
              onFinish={handleFinish}
              ref={el => (spinnerRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* PLAY BUTTON */}
        <div className="play-button-wrapper">
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

