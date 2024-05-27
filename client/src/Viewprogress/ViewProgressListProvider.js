// import { useEffect, useState, useContext } from "react";
// import { ViewProgressListContext } from "./ViewProgressListContext.js";
// import { UserContext } from "../User/UserContext";
// import { PlanContext } from "../Plan/PlanContext.js";

// function ViewProgressListProvider({ children }) {
//   const { loggedInUser } = useContext(UserContext);
//   const { loggedInPlan } = useContext(PlanContext);
//   const [viewProgressList, setViewProgressList] = useState(null);

//   const [viewProgressLoadObject, setViewProgressLoadObject] = useState({
//     state: "ready",
//     error: null,
//     data: null,
//   });

//   useEffect(() => {
//     if (!loggedInUser || !loggedInPlan) return;

//     const fetchData = async () => {
//       try {
//         setViewProgressLoadObject({ state: "pending", error: null, data: null });

//         const readingPlanResponse = await fetch(`http://localhost:8000/readingPlan/list`, {
//           method: "GET",
//         });
//         const readingPlanData = await readingPlanResponse.json();

//         const filteredReadingPlan = readingPlanData.filter(readingPlan => readingPlan.userId === loggedInUser.id);

//         const journeyRecordResponse = await fetch(`http://localhost:8000/journeyRecord/list`, {
//           method: "GET",
//         });
//         const journeyRecordData = await journeyRecordResponse.json();

//         const filteredJourneyRecord = journeyRecordData.filter(journeyRecord => journeyRecord.userId === loggedInUser.id);

//         const combinedData = {
//           readingPlan: filteredReadingPlan,
//           journeyRecord: filteredJourneyRecord,
//         };

//         setViewProgressLoadObject({ state: "ready", error: null, data: combinedData });
//         setViewProgressList(combinedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setViewProgressLoadObject({ state: "error", error, data: null });
//       }
//     };

//     fetchData();
//   }, [loggedInUser, loggedInPlan]);

//   const value = {
//     viewProgressList: viewProgressLoadObject.data || {},
//   };

//   return (
//       <ViewProgressListContext.Provider value={value}>
//         {children}
//       </ViewProgressListContext.Provider>
//   );
// }

// export default ViewProgressListProvider;

import { useEffect, useState, useContext } from "react";
import { ViewProgressListContext } from "./ViewProgressListContext.js";
import { UserContext } from "../User/UserContext";
import { PlanContext } from "../Plan/PlanContext.js";

function ViewProgressListProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const { loggedInPlan } = useContext(PlanContext);
  const [viewProgressList, setViewProgressList] = useState(null);
  const [selectedReadingPlanId, setSelectedReadingPlanId] = useState(null);
  const [viewProgressLoadObject, setViewProgressLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!loggedInUser || !loggedInPlan) return;

    const fetchData = async () => {
      try {
        setViewProgressLoadObject({ state: "pending", error: null, data: null });

        const readingPlanResponse = await fetch(`http://localhost:8000/readingPlan/list`, {
          method: "GET",
        });
        const readingPlanData = await readingPlanResponse.json();

        const filteredReadingPlan = readingPlanData.filter(readingPlan => readingPlan.userId === loggedInUser.id);

        const journeyRecordResponse = await fetch(`http://localhost:8000/journeyRecord/list`, {
          method: "GET",
        });
        const journeyRecordData = await journeyRecordResponse.json();

        const filteredJourneyRecord = journeyRecordData.filter(journeyRecord => journeyRecord.userId === loggedInUser.id);

        const combinedData = {
          readingPlan: filteredReadingPlan,
          journeyRecord: filteredJourneyRecord,
        };

        setViewProgressLoadObject({ state: "ready", error: null, data: combinedData });
        setViewProgressList(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setViewProgressLoadObject({ state: "error", error, data: null });
      }
    };

    fetchData();
  }, [loggedInUser, loggedInPlan]);

  const value = {
    viewProgressList: viewProgressLoadObject.data || {},
    setSelectedReadingPlanId,
  };

  return (
      <ViewProgressListContext.Provider value={value}>
        {children}
      </ViewProgressListContext.Provider>
  );
}

export default ViewProgressListProvider;
