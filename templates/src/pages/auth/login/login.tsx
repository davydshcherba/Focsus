import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

const LOGIN_URL = "http://localhost:8000/login"; // замість 127.0.0.1
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  if (!username || !password) {
    setError("Вкажіть логін та пароль");
    return;
  }

  setLoading(true);
  console.log("=== ПОЧАТОК ЗАПИТУ ===");
  console.log("URL:", LOGIN_URL);
  console.log("Дані:", { username, password });

  try {
    console.log("Відправляємо запит...");
    
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    console.log("Статус відповіді:", res.status);
    console.log("Headers:", res.headers);

    const data = await res.json();
    console.log("Отримані дані:", data);

    if (!res.ok) {
      setError(data?.detail || data?.message || `Помилка ${res.status}`);
    } else {
      setSuccess("Успішний вхід");
      
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        console.log("✅ Токен збережено");
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (err) {
    console.error("❌ ПОМИЛКА:", err);
    console.error("Тип помилки:", err instanceof TypeError ? "TypeError" : typeof err);
    setError("Не вдалося підключитися до сервера");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 space-y-5"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Увійти
        </h2>

        {error && (
          <p className="text-red-400 text-center text-sm bg-red-500/10 p-2 rounded-xl border border-red-700/30">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-center text-sm bg-green-500/10 p-2 rounded-xl border border-green-700/30">
            {success}
          </p>
        )}

        {/* Username */}
        <div>
          <label className="text-gray-300 text-sm">Логін</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ваш логін"
            className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-300 text-sm">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold shadow-lg disabled:opacity-50 active:scale-95"
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>

        <p className="text-xs text-gray-400 text-center">POST → {LOGIN_URL}</p>
      </form>
    </div>
  );
}
