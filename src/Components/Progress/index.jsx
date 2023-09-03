import { useEffect, useState } from "react";

const Progress = ({ callback }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent === 60) {
      callback();
      return;
    }
    const interval = setTimeout(() => {
      setPercent(percent + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [percent]);
  return (
    <div
      style={{
        padding: "0 1rem",
        width: "100%",
      }}
    >
      <div className="progress_container">
        <div
          className="barCompleted"
          style={{
            width: `${percent / 0.6}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
