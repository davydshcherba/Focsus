import Header from "../../../components/header/header";
import CircleTimer from "../../../components/timer/timer";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, fetchOptions } from "../../../config/api";

function TimeTracker() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0d0d0d] text-white font-black h-screen w-screen">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-2xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] text-white font-black h-screen w-screen">
      <Header />
      {user ? (
        <div>
          <CircleTimer />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-xl text-red-400">Please log in to access this page</p>
        </div>
      )}
    </div>
  );
}

export default TimeTracker;