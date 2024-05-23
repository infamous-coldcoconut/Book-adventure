import { useEffect, useState, useContext  } from "react";
import { RecordListContext } from "./RecordListContext.js";
import { UserContext } from "../User/UserContext";
import { PlanContext } from "./PlanContext.js";

function RecordListProvider({ children }) {
  const [recordLoadObject, setRecordLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const { loggedInUser } = useContext(UserContext); 
  const { loggedInPlan } = useContext(PlanContext);
  console.log(loggedInPlan);

  useEffect(() => {
    handleLoad();
  }, [loggedInUser, loggedInPlan]);

  async function handleLoad() {
    if (!loggedInUser || !loggedInPlan) {
      setRecordLoadObject({
          state: "ready",
          data: null,
      });
      return;
  }

    setRecordLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/journeyRecord/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      const filteredRecord = responseJson.filter(
        (journeyRecord) =>
          journeyRecord.userId === loggedInUser.id &&
          journeyRecord.readingPlanId === loggedInPlan.id
      );

      setRecordLoadObject({ state: "ready", data: filteredRecord });
      return filteredRecord;
    } else {
      setRecordLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    if (!loggedInUser || !loggedInPlan) return;

    dtoIn.userId = loggedInUser.id;
    dtoIn.readingPlanId = loggedInPlan.id;

    setRecordLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/journeyRecord/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setRecordLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setRecordLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setRecordLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/journeyRecord/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setRecordLoadObject((current) => {
        const journeyRecordIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[journeyRecordIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setRecordLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

//   async function handleRecord(dtoIn) {
//     setRecordLoadObject((current) => ({ ...current, state: "pending" }));
//     const response = await fetch(`http://localhost:8000/journeyRecord/update`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(dtoIn),
//     });
//     const responseJson = await response.json();

//     if (response.status < 400) {
//       await handleLoad();
//     } else {
//       setRecordLoadObject((current) => ({
//         state: "error",
//         data: current.data,
//         error: responseJson,
//       }));
//       throw new Error(JSON.stringify(responseJson, null, 2));
//     }
//   }

  async function handleDelete(dtoIn) {
    setRecordLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/journeyRecord/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setRecordLoadObject((current) => {
        const journeyRecordIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(journeyRecordIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setRecordLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  function getRecordsForPlanCard(planCardId) {
    return recordLoadObject.data.filter(record => record.planCardId === planCardId);
  }

  const value = {
    state: recordLoadObject.state,
    journeyRecordList: recordLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete, getRecordsForPlanCard  },
  };

  return (
    <RecordListContext.Provider value={value}>
      {children}
    </RecordListContext.Provider>
  );
}

export default RecordListProvider;