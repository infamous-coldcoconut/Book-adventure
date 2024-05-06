import { useContext } from "react";
import { BookContext } from "./BookContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

import BookDetail from "./BookDetail";

function BookRoute({ setShowBookForm }) {
  const navigate = useNavigate();
  const { book } = useContext(BookContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {book ? (
        <>
          <BookDetail book={book} />

          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/bookDetail?id=" + book.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowBookForm(book)} size={"sm"}>
              <Icon path={mdiPencil} size={0.7} />
            </Button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default BookRoute;


