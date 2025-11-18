import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Don't get token from localStorage since backend expects cookie
    fetch("http://localhost:8000/me", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include", // This sends cookies with the request
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
    <header className="flex justify-between items-center p-4">
      <h1 className="text-white text-4xl font-bold">
        Hello {user ? (user as any).username : "Guest"}
      </h1>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </header>
  );
}