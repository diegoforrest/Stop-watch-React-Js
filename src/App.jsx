import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const startStopwatch = () => {
        if (!isRunning) {
            const id = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(id);
            setIsRunning(true);
        }
    };

    const pauseStopwatch = () => {
        clearInterval(intervalId);
        setIsRunning(false);
    };

    const stopStopwatch = () => {
        clearInterval(intervalId);
        setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
        setTime(0);
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        clearInterval(intervalId);
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    const addLap = () => {
        setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <>
        <div className="container">
            <div className="stopwatch-container">
                <h1>Hrs:Min:Sec</h1>
                <div className="time-display">{formatTime(time)}</div>
                </div>
                <div className="Stopwatch-controls">
                    <button onClick={startStopwatch} disabled={isRunning}>
                    Play
                </button>
                <button onClick={pauseStopwatch} disabled={!isRunning}>
                    Pause
                </button>
                <button onClick={stopStopwatch} disabled={time == 0}>
                    Stop
                </button>
                <button onClick={resetStopwatch}>Reset</button>
                <button onClick={addLap} disabled={!isRunning || time == 0}>
                    Add Lap
                </button>
                </div>
                </div>
                <div className="lap-container">
  <h3>Laps</h3>
  <ul>
    {laps.slice().reverse().map((lap, index) => (
      <li 
        key={index} 
        className={index === 0 ? 'latest-lap' : ''}
      >
        Lap {laps.length - index}: {lap} {}
      </li>
    ))}
  </ul>
</div>
        </>
    );
};

export default Stopwatch;
