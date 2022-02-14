import { useEffect, useState } from "react";
import "./styles.css";

const CounterStatus = {
  STOPPED: "STOPPED",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED"
};

const styles = {
  button: {
    margin: 8
  }
};

export default function App() {
  const [count, setCount] = useState(0);
  const [counterStatus, setCounterStatus] = useState(CounterStatus.STOPPED);

  useEffect(() => {
    let interval;

    if (counterStatus === CounterStatus.RUNNING) {
      interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [counterStatus]);

  const handleCounterStart = () => {
    setCounterStatus(CounterStatus.RUNNING);
  };

  const handleCounterPause = () => {
    setCounterStatus(CounterStatus.PAUSED);
  };

  const handleCounterReset = () => {
    setCounterStatus(CounterStatus.STOPPED);
    setCount(0);
  };

  return (
    <div className="App">
      <h1>Counter app</h1>

      <hr />

      <h4>{count}</h4>

      <div>
        {(counterStatus === CounterStatus.STOPPED ||
          counterStatus === CounterStatus.PAUSED) && (
          <button style={styles.button} onClick={handleCounterStart}>
            Start
          </button>
        )}

        {counterStatus === CounterStatus.RUNNING && (
          <button style={styles.button} onClick={handleCounterPause}>
            Pause
          </button>
        )}

        {counterStatus === CounterStatus.PAUSED && (
          <button style={styles.button} onClick={handleCounterReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
