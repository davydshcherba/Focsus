import { useState, useEffect } from "react";

export default function CircleTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  const calcTotal = () => hours * 3600 + minutes * 60 + seconds;

  const [inputTime, setInputTime] = useState(calcTotal());
  const [timeLeft, setTimeLeft] = useState(calcTotal());
  const [running, setRunning] = useState(false);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / inputTime) * circumference;

  useEffect(() => {
    if (!running) return;

    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const startTimer = () => {
    const total = calcTotal();
    if (total > 0) {
      setInputTime(total);
      setTimeLeft(total);
      setRunning(true);
    }
  };

  const stopTimer = () => setRunning(false);

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(0);
  };

  return (
    <div className="text-white flex flex-col items-center p-6 gap-4">
      <h2 className="text-2xl font-semibold">Круговий таймер</h2>

      <div className="flex gap-3 bg-emerald-900 p-4 rounded-xl shadow-lg">
        <input
          type="number"
          className="p-2 rounded-lg text-black w-20 bg-white shadow-inner border-2 border-emerald-700"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          placeholder="Год"
          min={0}
        />
        <input
          type="number"
          className="p-2 rounded-lg text-black w-20 bg-white shadow-inner border-2 border-emerald-700"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Хв"
          min={0}
        />
        <input
          type="number"
          className="p-2 rounded-lg text-black w-20 bg-white shadow-inner border-2 border-emerald-700"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder="Сек"
          min={0}
        />
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#10b981"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>

        <span className="absolute text-3xl font-mono">{timeLeft}s</span>
      </div>

      <div className="flex gap-3 mt-2">
        <button onClick={startTimer} className="bg-green-600 px-4 py-2 rounded-xl">Start</button>
        <button onClick={stopTimer} className="bg-yellow-600 px-4 py-2 rounded-xl">Stop</button>
        <button onClick={resetTimer} className="bg-red-600 px-4 py-2 rounded-xl">Reset</button>
      </div>
    </div>
  );
}
