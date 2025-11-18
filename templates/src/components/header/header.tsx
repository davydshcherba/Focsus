import { useEffect, useState } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../config/api";

export default function Header() {
  const [user, setUser] = useState(null);

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
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null);
      });
  }, []);

  return (
    <header className="flex justify-between items-center p-8">
      <h1 className="text-white text-4xl font-bold">
        Hello {user ? (user as any).username : "Guest"}
      </h1>

      {user ? (
        <div className="flex gap-4 pr-7">
          <button className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-full bg-blue-500">
            Menu
          </button>
        </div>
      ) : (
        <div className="flex gap-4 pr-7">
          <a
            href="/login"
            className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-white hover:text-gray-300 transition-colors bg-blue-500 px-4 py-2 rounded-md"
          >
            Register
          </a>
        </div>
      )}
    </header>
  );
}