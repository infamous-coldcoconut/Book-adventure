import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";
import BookDetail from "./BookDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function BookCard({ book, setShowBookForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
        <BookDetail book={book} />

      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Button
          onClick={() => navigate("/bookDetail?id=" + book.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button> */}
        
        <Button onClick={() => setShowBookForm(book)} size={"sm"} style={buttonStyle()}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>

        <Button
          onClick={() => setShowConfirmDeleteDialog(book)}
          size={"sm"}
          variant="danger"
          style={buttonStyle()}

        >
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function buttonStyle(){
  return {
      color: "black",
      backgroundColor: "lightgrey",
      border: "solid black 1px"
  }
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

export default BookCard;