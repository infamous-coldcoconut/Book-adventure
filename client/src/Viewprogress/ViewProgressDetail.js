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

  // Access the correct part of readingPlan based on its structure
  const totalPlannedBooks = readingPlan && readingPlan.totalBooks ? readingPlan.totalBooks : 0;
  const totalPlannedPages = readingPlan && readingPlan.totalPages ? readingPlan.totalPages : 0;

  // Calculate the sums of actualReadBooks, actualReadPages, and timeSpent
  const actualReadBooks = journeyRecord ? journeyRecord.reduce((sum, record) => sum + (record.books || 0), 0) : 0;
  const actualReadPages = journeyRecord ? journeyRecord.reduce((sum, record) => sum + (record.pages || 0), 0) : 0;
  const timeSpent = journeyRecord ? journeyRecord.reduce((sum, record) => sum + (record.timeSpend || 0), 0) : 0;

  return (
    <div>
      <div style={{ display: "flex", rowGap: "4px", height: "30px" }}>
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

