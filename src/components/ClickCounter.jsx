import React, { useState } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };


  return (
    <div>
      <button type="button" onClick={handleClick}>
        Clicked
        {' '}
        {count}
        {' '}
        times
      </button>
    </div>
  );
};

export default ClickCounter;
