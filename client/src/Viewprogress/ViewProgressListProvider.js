// import { useEffect, useState, useContext } from "react";
// import { ViewProgressListContext } from "./ViewProgressListContext.js";
// import { UserContext } from "../User/UserContext";
// import { PlanContext } from "../Plan/PlanContext.js";

// function ViewProgressListProvider({ children }) {
//   const { loggedInUser } = useContext(UserContext); 
//   const { loggedInPlan } = useContext(PlanContext);

//   const value = {
//     loggedInUser,
//     loggedInPlan,
//   };

//   return (
//     <ViewProgressListContext.Provider value={value}>
//       {children}
//     </ViewProgressListContext.Provider>
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


  const [viewProgressLoadObject, setViewProgressLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!loggedInUser || !loggedInPlan) return;

    async function handleLoad() {
      if (!loggedInUser) {
        setViewProgressLoadObject({
            state: "ready",
            data: null,
        });
        return;
      }
    }

    const fetchData = async () => {
      try {
        // Fetch data from readingPlan endpoint
        setViewProgressLoadObject((current) => ({ ...current, state: "pending" }));

        const readingPlanResponse = await fetch(`http://localhost:8000/readingPlan/list`, {
          method: "GET",
        });
        const readingPlanData = await readingPlanResponse.json();

        const filteredReadingPlan = readingPlanData.filter(readingPlan => readingPlan.userId === loggedInUser.id);
        setViewProgressLoadObject({ state: "ready", data: filteredReadingPlan });

        // Fetch data from Book endpoint
        const journeyRecordResponse = await fetch(`http://localhost:8000/journeyRecord/list`, {
          method: "GET",
        });
        const journeyRecordData = await journeyRecordResponse.json();

        const filteredJourneyRecord = journeyRecordData.filter(journeyRecord => journeyRecord.userId === loggedInUser.id);
        setViewProgressLoadObject({ state: "ready", data: filteredJourneyRecord });

        // Combine data from readingPlan and Book into viewProgressList
        const combinedData = {
          readingPlan: filteredReadingPlan,
          journeyRecord: filteredJourneyRecord,
        };

        setViewProgressList(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedInUser, loggedInPlan]);

  console.log(viewProgressList);
  const value = {
    viewProgressList: viewProgressLoadObject.data || [],
  };

  return (
    <ViewProgressListContext.Provider value={value}>
      {children}
    </ViewProgressListContext.Provider>
  );
}

export default ViewProgressListProvider;


