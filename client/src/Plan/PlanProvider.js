import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { PlanContext } from "./PlanContext.js";

function PlanProvider({ children }) {
  const [planLoadObject, setPlanLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/readingPlan/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setPlanLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setPlanLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    loggedInPlan: planLoadObject.data,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export default PlanProvider;