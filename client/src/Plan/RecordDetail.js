import React, { useState, useEffect } from "react";

function RecordDetail({ journeyRecord }) {
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    if (!journeyRecord.bookId) return;
    async function fetchBookTitle() {
      try {
        const queryParam = journeyRecord.bookId ? `id=${journeyRecord.bookId}` : `title=${journeyRecord.bookTitle}`;
        const response = await fetch(`http://localhost:8000/book/get?id=?${queryParam}`);
        const book = await response.json();
        console.log(book);

        if (response.ok) {
          setBookTitle(book.title);
        } else {
          throw new Error(book.error);
        }
      } catch (error) {
        console.error("Error fetching book title:", error);
      }
    }

    fetchBookTitle();
  }, [journeyRecord.bookId]);

  return (
    <div>
      <div style={{ display: "flex", rowGap: "4px", height: "30px" }}>
        <div style={RecordStyle()}>Book: {bookTitle}</div>
        <div style={RecordStyle()}>Total pages read: {journeyRecord.pages}</div>
        <div style={RecordStyle()}>Total time read: {journeyRecord.timeSpend}</div>
      </div>
    </div>
  );
}

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

export default RecordDetail;


