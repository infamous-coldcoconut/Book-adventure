import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ViewProgressContext } from "./ViewProgressContext.js";

function ViewProgressProvider({ children }) {
  const [viewProgressLoadObject, setViewProgressList] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setViewProgressList((current) => ({ ...current, state: "pending" }));
    try {
      // Fetch reading plan data
      const readingPlanResponse = await fetch(
        `http://localhost:8000/readingPlan/get?id=${new URLSearchParams(
          location.search
        ).get("id")}`,
        {
          method: "GET",
        }
      );

      // Fetch journey record data
      const journeyRecordResponse = await fetch(
        `http://localhost:8000/journeyRecord/get?id=readingPlanId`,
        {
          method: "GET",
        }
      );

      const readingPlanJson = await readingPlanResponse.json();
      const journeyRecordJson = await journeyRecordResponse.json();

      if (readingPlanResponse.status < 400 && journeyRecordResponse.status < 400) {
        setViewProgressList({ state: "ready", data: { readingPlan: readingPlanJson, journeyRecord: journeyRecordJson } });
      } else {
        throw new Error(JSON.stringify(readingPlanJson || journeyRecordJson, null, 2));
      }
    } catch (error) {
      setViewProgressList((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  const value = {
    state: viewProgressLoadObject.state,
    viewProgress: viewProgressLoadObject.data,
  };

  return (
    <ViewProgressContext.Provider value={value}>{children}</ViewProgressContext.Provider>
  );
}

export default ViewProgressProvider;
