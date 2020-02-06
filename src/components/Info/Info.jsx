import React from "react";

const Info = () => {
  return (
    <div>
      <p>
        Score: <span id="score">0</span>
      </p>
      <p>
        Lines: <span id="lines">0</span>
      </p>
      <p>
        Level: <span id="level">0</span>
      </p>
      <canvas id="next" className="next"></canvas>
    </div>
  );
};

export default Info;
