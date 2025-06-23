import { useRef, useState } from "react";
import classes from "@/styles/timer.module.css";

export const Timer = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleStartStopTimer = () => {
    if (!isStarted) {
      setIsStarted(true);

      timer.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) return prevSeconds - 1;

          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              setSeconds(59);
              return prevMinutes - 1;
            }

            setHours((prevHours) => {
              if (prevHours > 0) {
                setMinutes(59);
                setSeconds(59);
                return prevHours - 1;
              }

              if (timer.current) clearInterval(timer.current);
              setIsStarted(false);
              return 0;
            });

            return 0;
          });

          return 0;
        });
      }, 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
      setIsStarted(false);
    }
  };

  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsStarted(false);
    if (timer.current) clearInterval(timer.current);
  };

  const safeCheck = (val: number): number => {
    if (isNaN(val)) return 0;
    return Math.min(59, val);
  };

  return (
    <div className={`${classes.temp}`}>
      <div className={`${classes.parent}`}>
        <h1>Countdown Timer</h1>

        <div className={`${classes.inputContainer}`}>
          <div className={`${classes.inputBox}`}>
            <h4 style={{ fontSize: "24px" }}>Hours</h4>
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(safeCheck(parseInt(e.target.value)))}
              maxLength={2}
              className={`${classes.input}`}
              placeholder="00"
              disabled={isStarted}
            />
          </div>

          <div className={`${classes.inputBox}`}>
            <h4 style={{ fontSize: "24px" }}>Minutes</h4>
            <input
              type="text"
              value={minutes}
              onChange={(e) => setMinutes(safeCheck(parseInt(e.target.value)))}
              maxLength={2}
              className={`${classes.input}`}
              placeholder="00"
              disabled={isStarted}
            />
          </div>

          <div className={`${classes.inputBox}`}>
            <h4 style={{ fontSize: "24px" }}>Seconds</h4>
            <input
              type="text"
              value={seconds}
              onChange={(e) => setSeconds(safeCheck(parseInt(e.target.value)))}
              maxLength={2}
              className={`${classes.input}`}
              placeholder="00"
              disabled={isStarted}
            />
          </div>
        </div>

        <div className={`${classes.btnGroup}`}>
          <button
            style={{ background: isStarted ? "red" : "lightgreen" }}
            onClick={handleStartStopTimer}
            className={`${classes.btn}`}
          >
            {isStarted ? "Stop" : "Start"}
          </button>

          <button
            onClick={handleReset}
            style={{ background: "yellow" }}
            className={`${classes.btn}`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
