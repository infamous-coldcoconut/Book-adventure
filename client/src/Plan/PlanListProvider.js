import { useEffect, useState } from "react";
import { PlanListContext } from "./PlanListContext.js";

function PlanListProvider({ children }) {
  const [planLoadObject, setPlanLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/readingPlan/list`, {
      method: "GET",
    });
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

  async function handleCreate(dtoIn) {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/readingPlan/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setPlanLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setPlanLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/readingPlan/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setPlanLoadObject((current) => {
        const readingPlanIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[readingPlanIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setPlanLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleRecord(dtoIn) {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/journeyRecord/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await handleLoad();
    } else {
      setPlanLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    planState: planLoadObject.state,
    planList: planLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleRecord },
  };

  return (
    <PlanListContext.Provider value={value}>
      {children}
    </PlanListContext.Provider>
  );
}

export default PlanListProvider;