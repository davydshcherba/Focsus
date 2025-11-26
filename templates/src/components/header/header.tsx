import { useEffect, useState } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../config/api";
import PillNav from "../pillNav/pillNav";
import logo from "../../local/logo.png";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.ME, {
        method: "GET",
        ...fetchOptions,
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    // Слухати подію оновлення юзера
    const handleUserUpdate = () => {
      console.log("🔄 User updated event received");
      fetchUser();
    };
    
    window.addEventListener("user-updated", handleUserUpdate);

    return () => {
      window.removeEventListener("user-updated", handleUserUpdate);
    };
  }, []);

  if (loading) {
    return (
      <header className="flex items-center p-8 bg-[#111] text-white shadow-lg">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </header>
    );
  }

  return (
    <header className="flex items-center p-8 bg-[#111] text-white shadow-lg">
      <h1 className="text-4xl font-bold">
        {user ? `Welcome Back ${user.username} 🔥 (${user.points} pts)` : "Please log in"}
      </h1>
      {user ? (
        <div className="ml-auto">
          <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "/" },
              { label: "Trackers", href: "/trackers" },
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
          
            href="/login"
            className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md"
          <a>
            Login
          </a>
          
            href="/register"
            className="text-white bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-md"
          <a>
            Register
          </a>
        </div>
      )}
    </header>
  );
}