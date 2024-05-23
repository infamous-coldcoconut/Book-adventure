import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { RecordContext } from "./RecordContext.js";
import { UserContext } from "../User/UserContext";
import { PlanContext } from "../Plan/PlanContext";

function RecordProvider({ children }) {
  const [recordLoadObject, setRecordLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const location = useLocation();
  const { loggedInUser } = useContext(UserContext);
  const { loggedInPlan } = useContext(PlanContext);

  useEffect(() => {
    if (loggedInUser && loggedInPlan) {
      handleLoad();
    }
  }, [loggedInUser, loggedInPlan, location.search]);

  async function handleLoad() {
    setRecordLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(
        `http://localhost:8000/journeyRecord/get?userId=${loggedInUser.id}&readingPlanId=${loggedInPlan.id}`,
        {
          method: "GET",
        }
      );
      const responseJson = await response.json();
      if (response.status < 400) {
        setRecordLoadObject({ state: "ready", data: responseJson });
        return responseJson;
      } else {
        throw new Error(responseJson.error);
      }
    } catch (error) {
      setRecordLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
      throw new Error(error.message);
    }
  }

  const value = {
    journeyRecord: recordLoadObject.data,
  };

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}

export default RecordProvider;
