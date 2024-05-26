// function ViewProgressDetail({ readingPlan, journeyRecord }) {
//   return (
//       <div>
//           <div style={{ display: "flex", rowGap: "4px", height: "30px" }}>
//               <div style={RecordStyle()}>Total planned books: {readingPlan.totalBooks}</div>
//               <div style={RecordStyle()}>Actual read books: {journeyRecord.books}</div>
//               <div style={RecordStyle()}>Total planned pages: {readingPlan.totalPages}</div>
//               <div style={RecordStyle()}>Actual read pages: {journeyRecord.pages}</div>
//               <div style={RecordStyle()}>Time spent: {journeyRecord.timeSpend}</div>
//           </div>
//       </div>
//   );

//     function RecordStyle() {
//         return {
//             position: "relative",
//             fontSize: "22px",
//             display: "flex",
//             width: "33%",
//             height: "30px",
//             textAlign: "center",
//             justifyContent: "center",
//         }
//     }
// }

// export default ViewProgressDetail;


function ViewProgressDetail({ readingPlan, journeyRecord }) {
  console.log("Reading Plan:", readingPlan);
  console.log("Journey Record:", journeyRecord);

  // Access the correct part of readingPlan and journeyRecord based on their structure
  const readingPlanId = readingPlan && readingPlan[0] && readingPlan[0].id ? readingPlan[0].id : "N/A";
  const totalPlannedBooks = readingPlan && readingPlan[0] && readingPlan[0].totalBooks ? readingPlan[0].totalBooks : 0;
  const totalPlannedPages = readingPlan && readingPlan[0] && readingPlan[0].totalPages ? readingPlan[0].totalPages : 0;

  const actualReadBooks = journeyRecord && journeyRecord[0] && journeyRecord[0].books ? journeyRecord[0].books : 0;
  const actualReadPages = journeyRecord && journeyRecord[0] && journeyRecord[0].pages ? journeyRecord[0].pages : 0;
  const timeSpent = journeyRecord && journeyRecord[0] && journeyRecord[0].timeSpend ? journeyRecord[0].timeSpend : 0;

  return (
    <div>
      <div style={{ display: "flex", rowGap: "4px", height: "30px" }}>
        <div style={RecordStyle()}>Reading Plan ID: {readingPlanId}</div>
        <div style={RecordStyle()}>Total planned books: {totalPlannedBooks}</div>
        <div style={RecordStyle()}>Actual read books: {actualReadBooks}</div>
        <div style={RecordStyle()}>Total planned pages: {totalPlannedPages}</div>
        <div style={RecordStyle()}>Actual read pages: {actualReadPages}</div>
        <div style={RecordStyle()}>Time spent: {timeSpent}</div>
      </div>
    </div>
  );

  function RecordStyle() {
    return {
      position: "relative",
      fontSize: "22px",
      display: "flex",
      width: "33%",
      height: "30px",
      textAlign: "center",
      justifyContent: "center",
    };
  }
}

export default ViewProgressDetail;


