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
    const [symbols, setSymbols] = useState([null, null, null]);
    const symbolsRef = useRef(symbols);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const SYMBOL_KEYS = [
      "ten","coins","bao","tree","boat","chingling",
      "symbol_a","symbol_j","symbol_k","symbol_q",
      "fu","drums","nine"
    ];

    const spinOnce = () => {
      const newSymbols = Array.from({ length: 3 }, () =>
        SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)]
      );

      symbolsRef.current = newSymbols; // ✅ keep latest
      setSymbols(newSymbols);
      // setSymbols(
      //   Array.from({ length: 3 }, () =>
      //     SYMBOL_KEYS[Math.floor(Math.random() * SYMBOL_KEYS.length)]
      //   )
      // );
    };

    const reset = () => {
      // clear any previous spin
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);

      // start spinning
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

