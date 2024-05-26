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
