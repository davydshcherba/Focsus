import { useState, useEffect } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../config/api";

export default function CircleTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [points, setPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const calcTotal = () => hours * 3600 + minutes * 60 + seconds;
  const [inputTime, setInputTime] = useState(calcTotal());
  const [timeLeft, setTimeLeft] = useState(calcTotal());
  const [running, setRunning] = useState(false);

  // Завантажуємо дані користувача при монтуванні компонента
  useEffect(() => {
    fetch(API_ENDPOINTS.ME, {
      method: "GET",
      ...fetchOptions,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          setPoints(data.user.points || 0);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / inputTime) * circumference;

  // Функція для відправки балів на сервер
  const updatePointsOnServer = async (earnedPoints: number) => {
    console.log("=== SENDING POINTS TO SERVER ===");
    console.log("Earned points:", earnedPoints);
    
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_POINTS(earnedPoints), {
        method: "GET",
        ...fetchOptions,
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update points on server:", errorText);
        return false;
      }

      const data = await response.json();
      console.log("Server response:", data);
      
      if (data.success) {
        setPoints(data.total_points);
        console.log(`✅ Points updated! Old: ${data.old_points}, New: ${data.new_points}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Error updating points:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!running) return;
    
    if (timeLeft <= 0) {
      console.log("⏰ Timer finished!");
      setRunning(false);
      
      const earnedPoints = Math.floor(inputTime / 5);
      console.log("Calculated earned points:", earnedPoints);
      console.log("Input time was:", inputTime, "seconds");
      
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);
      
      updatePointsOnServer(earnedPoints);
      
      return;
    }
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [running, timeLeft, inputTime]);

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

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
<div className="text-white flex flex-col items-center p-6 gap-4">



{showPointsAnimation && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
    <span className="text-5xl font-bold text-yellow-400">
      +{Math.floor(inputTime / 5)} 🎉
    </span>
  </div>
)}

<div className="flex gap-3 bg-[#0f172a] p-4 rounded-xl shadow-lg">
  <input
    type="number"
    className="p-2 rounded-lg text-white w-20 bg-[#1e293b] shadow-inner border-2 border-emerald-600"
    value={hours}
    onChange={(e) => setHours(Number(e.target.value))}
    placeholder="Год"
    min={0}
    disabled={running}
  />
  <input
    type="number"
    className="p-2 rounded-lg text-white w-20 bg-[#1e293b] shadow-inner border-2 border-emerald-600"
    value={minutes}
    onChange={(e) => setMinutes(Number(e.target.value))}
    placeholder="Хв"
    min={0}
    disabled={running}
  />
  <input
    type="number"
    className="p-2 rounded-lg text-white w-20 bg-[#1e293b] shadow-inner border-2 border-emerald-600"
    value={seconds}
    onChange={(e) => setSeconds(Number(e.target.value))}
    placeholder="Сек"
    min={0}
    disabled={running}
  />
</div>

<div className="relative w-48 h-48 flex items-center justify-center">
  <svg width="200" height="200">
    <circle
      cx="100"
      cy="100"
      r={radius}
      stroke="#334155"
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
      style={{ 
        transition: "stroke-dashoffset 1s linear",
        transform: "rotate(-90deg)",
        transformOrigin: "center"
      }}
    />
  </svg>
  <span className="absolute text-3xl font-mono text-white">
    {formatTime(timeLeft)}
  </span>
</div>

<div className="flex gap-3 mt-2">
  <button 
    onClick={startTimer} 
    disabled={running}
    className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
  >
    Start
  </button>
  <button 
    onClick={stopTimer} 
    disabled={!running}
    className="bg-yellow-600 px-4 py-2 rounded-xl hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
  >
    Stop
  </button>
  <button 
    onClick={resetTimer} 
    className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
  >
    Reset
  </button>
</div>

<div className="text-sm text-gray-400 mt-2">
  💡 Ви отримуєте 1 бал за кожні 5 секунд таймера
</div>
</div>

  );
}