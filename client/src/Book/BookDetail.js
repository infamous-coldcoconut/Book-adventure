// function BookDetail({ book }) {
//     return (
//         <div>
//             <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
//                 <div style={RecordStyle()}>Title:<br></br>{book.title}</div>
//                 <div style={RecordStyle()}>Pages:{book.pages}</div>
//             </div>
//         </div>
// )
//     ;
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

// export default BookDetail;
function BookDetail({ book }) {
  return (
    <div style={containerStyle()}>
      <div style={leftStyle()}>Title: <br /> {book.title}</div>
      <div style={rightStyle()}>Pages: {book.pages}</div>
    </div>
  );
}

function containerStyle() {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
  };
}

function leftStyle() {
  return {
    fontSize: "22px",
    textAlign: "left",
    width: "50%",
  };
}

function rightStyle() {
  return {
    fontSize: "22px",
    textAlign: "right",
    width: "50%",
  };
}

export default BookDetail;
