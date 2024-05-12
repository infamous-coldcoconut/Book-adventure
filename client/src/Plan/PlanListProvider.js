import { useEffect, useState, useContext  } from "react";
import { PlanListContext } from "./PlanListContext.js";
import { UserContext } from "../User/UserContext";


function PlanListProvider({ children }) {
  const [planLoadObject, setPlanLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    handleLoad();
  }, [loggedInUser]);

  async function handleLoad() {
    if (!loggedInUser) {
      setPlanLoadObject({
          state: "ready",
          data: null,
      });
      return;
  }

    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/readingPlan/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      const filteredPlan = responseJson.filter(readingPlan => readingPlan.userId === loggedInUser.id);

      setPlanLoadObject({ state: "ready", data: filteredPlan });
      console.log(filteredPlan);
      return filteredPlan;
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
    if (!loggedInUser) return;

    dtoIn.userId = loggedInUser.id;
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

  async function handleDelete(dtoIn) {
    setPlanLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/readingPlan/delete`, {
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
        current.data.splice(readingPlanIndex, 1);
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

  

  const value = {
    state: planLoadObject.state,
    planList: planLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete, handleRecord },
  };

  return (
    <PlanListContext.Provider value={value}>
      {children}
    </PlanListContext.Provider>
  );
}

export default PlanListProvider;