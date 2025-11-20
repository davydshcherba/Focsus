import { useEffect, useState } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../config/api";
import PillNav from "../pillNav/pillNav";
import logo from "../../local/logo.png"

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
    <header className="flex items-center p-8 bg-[#111] text-white shadow-lg">
    <h1 className="text-bold text-4xl font-bold">
      {user ? (
        <p>Welcome Back {(user as any).username} 🔥</p>
      ) : (
        "Please log in"
      )}
    </h1>
  
    {user ? (
      <div className="ml-auto">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#1f2937"
          hoveredPillTextColor="#10b981"
          pillTextColor="#ffffff"
        />
      </div>
    ) : (
      <div className="flex gap-4 pr-7 ml-auto">
        <a
          href="/login"
          className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md"
        >
          Login
        </a>
        <a
          href="/register"
          className="text-white bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-md"
        >
          Register
        </a>
      </div>
    )}
  </header>
  
  );
}
