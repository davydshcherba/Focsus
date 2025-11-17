import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Помилка реєстрації");

      setSuccess("Реєстрація успішна!");
    } catch (err: any) {
      setError(err.message || "Помилка");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Реєстрація
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Ім'я користувача</label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Пароль</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          {success && (
            <p className="text-green-400 text-center text-sm">{success}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white font-semibold shadow-lg"
          >
            Зареєструватися
          </button>
        </form>
      </div>
    </div>
  );
}
