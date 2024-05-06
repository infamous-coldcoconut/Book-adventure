import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ViewprogressContext } from "./ViewprogressContext.js";

function ViewProgressProvider({ children }) {
  const [progressLoadObject, setProgressLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setProgressLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(
        `http://localhost:8000/viewProgress/get?id=${new URLSearchParams(
          location.search
        ).get("id")}`,
        {
          method: "GET",
        }
      );
      const responseJson = await response.json();
      if (response.status < 400) {
        setProgressLoadObject({ state: "ready", data: responseJson });
      } else {
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      setProgressLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  const value = {
    progress: progressLoadObject.data,
  };

  return (
    <ViewprogressContext.Provider value={value}>{children}</ViewprogressContext.Provider>
  );
}

export default ViewProgressProvider;
