import React, { useState } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../../config/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        ...fetchOptions,
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.detail || data?.message || `Error ${res.status}`);
      } else {
        setSuccess("Login successful");

        // Якщо сервер видає токен, кладемо його в cookie
        if (data.access_token) {
          document.cookie = `access_token=${data.access_token}; path=/; Secure; SameSite=Lax`;
        }

        // 🔥 Запускаємо подію оновлення юзера
        window.dispatchEvent(new Event("user-updated"));

        setTimeout(() => {
          navigate("/");
        }, 300);
      }
    } catch (err) {
      setError("Something went wrong, try again");
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
          Login
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

        <div>
          <label className="text-gray-300 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold shadow-lg disabled:opacity-50 active:scale-95"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
