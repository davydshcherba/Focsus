import React, { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const LOGIN_URL = "http://127.0.0.1:8000/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("Вкажіть логін та пароль");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          data?.detail || data?.message || `Помилка ${res.status}`;
        setError(message);
      } else {
        setSuccess("Успішний вхід");
      }
    } catch (err) {
      setError("Не вдалося підключитися до сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-white text-center drop-shadow">
          Увійти
        </h2>

        {error && (
          <div className="text-sm text-red-200 bg-red-500/20 p-2 rounded-xl border border-red-300/30 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-100 bg-green-500/20 p-2 rounded-xl border border-green-300/30 text-center">
            {success}
          </div>
        )}

        {/* Username */}
        <div>
          <label className="block text-white text-sm mb-1">Логін</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ваш логін"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/60 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-white text-sm mb-1">Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/60 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition active:scale-95 shadow-lg disabled:opacity-50"
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>

        <p className="text-xs text-white/70 text-center">
          POST → {LOGIN_URL}
        </p>
      </form>
    </div>
  );
}
