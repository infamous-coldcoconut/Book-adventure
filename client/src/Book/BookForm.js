import { useContext, useState } from "react";
import { BookListContext } from "./BookListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function BookForm({ setShowBookForm, book = {} }) {
  const { state, handlerMap } = useContext(BookListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";


  return (
    <Modal show={true} onHide={() => setShowBookForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          let formData = Object.fromEntries(new FormData(e.target));
          try {
            if (book.id) {
              formData.id = book.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowBookForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            book.id ? "Edit" : "Create"
          } a book`}</Modal.Title>
          <CloseButton onClick={() => setShowBookForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create a book</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              defaultValue={book.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pages</Form.Label>
            <Form.Control
              type="number"
              name="pages"
              required
              defaultValue={book.pages}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowBookForm(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {book.id ? "edit" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}


export default BookForm;

