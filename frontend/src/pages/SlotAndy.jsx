import '../SlotAndy.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import get_symbol_image from '../exports/helper';


function SlotAndy() {
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

  const Spinner = forwardRef(({ onFinish, timer }, ref) => {
    const [symbols, setSymbols] = useState([null, null, null]); // 3 symbols visible
    const timerRef = useRef();
    const multiplierRef = useRef(Math.floor(Math.random() * 3) + 1);
    const ICON_HEIGHT = 188;

    const SYMBOL_KEYS = [
      "ten","coins","bao","tree","boat","chingling",
      "symbol_a","symbol_j","symbol_k","symbol_q",
      "fu","drums","nine"
    ]; // match your SYMBOLS object

    const reset = useCallback(() => {
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => tick(), 100);
    }, []);

    const tick = useCallback(() => {
      // generate 3 random symbols for spinning
      const newSymbols = Array(3)
        .fill(0)
        .map(() => SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)]);
      setSymbols(newSymbols);

      // stop spinning after timer
      timerRef.current = setTimeout(() => {
        clearInterval(timerRef.current);
        onFinish(newSymbols);
      }, timer);
    }, [onFinish, timer]);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    // useEffect(() => { // keeps spinning forever
    //   reset();
    //   return () => clearInterval(timerRef.current);
    // }, [reset]);

    return (
      <div className="spinner-column">
        {symbols.map((symbolKey, i) => (
          <img
            key={i}
            src={get_symbol_image(symbolKey, true)} // true = gold active
            style={{
              width: ICON_HEIGHT,
              height: ICON_HEIGHT,
              display: "block"
            }}
            alt={symbolKey}
          />
        ))}
      </div>
    );
  });

  const SlotMachine = () => {
    const REELS = 5;
    const spinnerRefs = useRef(Array(REELS).fill(null));

    const handleFinish = (symbols) => {
      console.log("Reel finished:", symbols);
      // Here you can handle matches, winner logic, etc.
    };

    const handleClick = () => {
      spinnerRefs.current.forEach(spinner => spinner?.reset());
    };

    return (
      <div>
        <button onClick={handleClick}>Spin</button>
        <div className="spinner-container">
          {Array.from({ length: REELS }).map((_, index) => (
            <Spinner
              key={index}
              timer={1000 + index * 300}
              onFinish={handleFinish}
              ref={el => (spinnerRefs.current[index] = el)}
            />
          ))}
        </div>
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

