import React, { useState } from 'react';

function MultiplierButton({ children }) {
  // 1. Initialize a state variable to track the active status
  const [isActive, setIsActive] = useState(false);

  // 2. Define a function to handle the click event and update the state
  const handleClick = () => {
    setIsActive(!isActive);
  };

  // 3. Apply styles conditionally
  // Method A: Inline styles using a ternary operator
  const buttonStyle = {
    backgroundColor: isActive ? 'gold' : 'grey',
    color: isActive ? 'grey' : 'gold',
    padding: '10px 20px',
    border: '1px solid gold',
    cursor: 'pointer',
  };

  return (
    <button
      onClick={handleClick}
      // Use inline style
      style={buttonStyle}

    >
      {children}
    </button>
  );
}

function MultiplierButtons() {
  return (
    <div>
      {/* GOLD SELECTORS */}
      <div className="multiplier-grid">
        <MultiplierButton 
          className="multiplier-btn"
        >
          1 gold symbol (8 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          2 gold symbols (18 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          3 gold symbols (38 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          4 gold symbols (68 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          5 gold symbols (88 credits)
        </MultiplierButton>

        {/* MULTIPLIER */}

        <MultiplierButton 
          className="multiplier-btn"
        >
          1 gold symbol (8 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          2 gold symbols (18 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          3 gold symbols (38 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          4 gold symbols (68 credits)
        </MultiplierButton>

        <MultiplierButton 
          className="multiplier-btn"
        >
          5 gold symbols (88 credits)
        </MultiplierButton>
      </div>

    </div>
  )
}

export default MultiplierButton;
