import React, { useState } from 'react';

function MultiplierButton({ children, isActive, onClick }) {
  // const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    backgroundColor: isActive ? 'gold' : 'grey',
    color: isActive ? 'grey' : 'gold',
    padding: '10px 20px',
    border: '1px solid gold',
    cursor: 'pointer',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
}

function MultiplierButtons({
  goldSymbols,
  setGoldSymbols,
  multiplier,
  setMultiplier
}) {
  return (
    <div className='multiplier-grid'>
      {/* GOLD SELECTORS */}
      {[1, 2, 3, 4, 5].map((num) => (
        <MultiplierButton
          key={`gold-${num}`}
          isActive={goldSymbols === num}
          onClick={() => setGoldSymbols(num)}
        >
          {num} gold symbol{num > 1 ? 's' : ''} <br />( 
          {num === 1 ? 8 : num === 2 ? 18 : num === 3 ? 38 : num === 4 ? 68 : 88} 
          {' '} credits) <br />
        </MultiplierButton>
      ))}

      {/* MULTIPLIER SELECTORS */}
      {[1, 2, 3, 4, 5].map((x) => (
        <MultiplierButton
          key={`multi-${x}`}
          isActive={multiplier === x}
          onClick={() => setMultiplier(x)}
        >
          Play<br />
          {x}X<br />
          Per Spin<br />
        </MultiplierButton>
      ))}


    </div>
  )
}

export default MultiplierButtons;
