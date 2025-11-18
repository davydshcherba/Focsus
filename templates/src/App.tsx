import Header from "./components/header/header";
import CircleTimer from "./components/timer/timer";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, fetchOptions } from "./config/api";

function App() {
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
    <div className="bg-emerald-900 h-screen w-screen">
      <Header />
      {user ? (
        <div>
          <CircleTimer />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;