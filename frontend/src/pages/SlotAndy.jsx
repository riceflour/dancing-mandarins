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
    const [position, setPosition] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(timer);
    const timerRef = useRef();
    const multiplierRef = useRef(Math.floor(Math.random() * (4 - 1) + 1));
    const startPositionRef = useRef(
      Math.floor(Math.random() * 9) * ICON_HEIGHT * -1
    );
    const speedRef = useRef(ICON_HEIGHT * multiplierRef.current);

    const reset = useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      startPositionRef.current = Math.floor(Math.random() * 9) * ICON_HEIGHT * -1;
      multiplierRef.current = Math.floor(Math.random() * (4 - 1) + 1);
      speedRef.current = ICON_HEIGHT * multiplierRef.current;

      setPosition(startPositionRef.current);
      setTimeRemaining(timer);

      timerRef.current = setInterval(() => {
        tick();
      }, 100);
    }, [timer]);

    const getSymbolFromPosition = useCallback(() => {
      // const totalSymbols = 9;
      const totalSymbols = 13;
      const middle = Math.abs(startPositionRef.current / ICON_HEIGHT) % totalSymbols;
      const symbols = [
        (middle - 1 + totalSymbols) % totalSymbols, // top
        middle,                                     // middle
        (middle + 1) % totalSymbols,                // bottom
      ];
      // Defer onFinish to avoid calling state updates during render
      setTimeout(() => {
        onFinish(symbols);
      }, 0);


      // const maxPosition = ICON_HEIGHT * (totalSymbols - 1) * -1;
      // const moved = (timer / 100) * multiplierRef.current;
      // let currentPosition = startPositionRef.current;

      // for (let i = 0; i < moved; i++) {
      //   currentPosition -= ICON_HEIGHT;
      //   if (currentPosition < maxPosition) {
      //     currentPosition = 0;
      //   }
      // }

      // // Defer onFinish to avoid calling state updates during render
      // setTimeout(() => {
      //   onFinish(currentPosition);
      // }, 0);
    }, [onFinish, totalSymbols]); // }, [timer, onFinish]);

    const tick = useCallback(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          getSymbolFromPosition();
          return 0;
        }

        setPosition((prevPosition) => prevPosition - speedRef.current);
        return prev - 100;
      });
    }, [getSymbolFromPosition]);

    useEffect(() => {
      reset();
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [reset]);

    useImperativeHandle(
      ref,
      () => ({
        reset,
      }),
      [reset]
    );

    return (
      <div
        style={{ backgroundPosition: `0px ${position}px` }}
        className="icons"
      />
    );
  });

  Spinner.displayName = "Spinner";

  const SlotMachine = () => {
    const [winner, setWinner] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loserMessage, setLoserMessage] = useState("");
    // const spinnerRefs = useRef([null, null, null]); 3 x 3 and only 1 row count, 1 x 3 counts
    const REELS = 5;
    const ROWS = 3;
    const TOTAL_SYMBOLS = 13;
    const spinnerRefs = useRef(Array(REELS).fill(null)); // 5 x 3

    const handleClick = () => {
      setWinner(null);
      setMatches([]);
      setLoserMessage("");
      spinnerRefs.current.forEach((spinner) => spinner?.reset());
    };

    const handleFinish = (value) => {
      // setMatches((prev) => {
      //   const updated = [...prev, value];

      //   if (updated.length === 3) {
      //     const allSame = updated.every((v) => v === updated[0]);

      //     // Defer state update to avoid React warning
      //     setTimeout(() => {
      //       setWinner(allSame);
      //       if (!allSame) {
      //         setLoserMessage(
      //           LOSER_MESSAGES[Math.floor(Math.random() * LOSER_MESSAGES.length)]
      //         );
      //       }
      //     }, 0);
      //   }

      //   return updated;
      // });
      setReelResults((prev) => {
        const updated = [...prev, symbols];
        if (updated.length === REELS) {
          evaluateBoard(updated); 
        }
        return updated
      })
    };

    return (
      <div>
        {winner && <WinningSound />}
        <h1 style={{ color: "white" }}>
          <span>
            {winner === null
              ? "Waiting…"
              : winner
              ? "🤑 Pure skill! 🤑"
              : loserMessage}
          </span>
        </h1>

        <div className="spinner-container">
          {/* {[1000, 1400, 2200].map((timer, index) => (
            <Spinner
              key={index}
              onFinish={handleFinish}
              timer={timer}
              ref={(el) => (spinnerRefs.current[index] = el)}
            />
          ))} */}
          {
            Array.from({ length: REELS }).map((_, index) => {
              <Spinner 
                key={index}
                timer={1000 + index * 300}
                onFinish={handleFinish}
                ref={(el) => (spinnerRefs.current[index] = el)}

              />
            })
          }
          <div className="gradient-fade" />
        </div>

        {winner !== null && 
          <div>
            <PlayButton onClick={handleClick} />
            {/* <RepeatButton onClick={handleClick} /> */}
          </div>
        }
      </div>
    );
  };

  return (
    <div className="slot-page">
      <SlotMachine />
    </div>
  )
}

export default SlotAndy;