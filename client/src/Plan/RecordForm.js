import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useState, useEffect } from "react";
import { RecordListContext } from "./RecordListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function RecordForm({ setShowRecordForm, journeyRecord = {} }) {
  const { state, handlerMap } = useContext(RecordListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";
  const [title, setBookTitle] = useState("");
  const [bookId, setBookId] = useState(journeyRecord.bookId || "");

useEffect(() => {
  setBookId(journeyRecord.bookId || "");
}, [journeyRecord.bookId]);

async function fetchBookIdByTitle(title) {
  try {
    const response = await fetch(`http://localhost:8000/book/get?title=${encodeURIComponent(title)}`);
    const books = await response.json();
    if (response.ok && books.length > 0) {
      setBookId(books.id);
    } else {
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book ID:", error);
    setShowAlert(error.message);
  }
}
  return (
    <Modal show={true} onHide={() => setShowRecordForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          let formData = Object.fromEntries(new FormData(e.target));
          formData.date = new Date(formData.date).toISOString();
          formData.bookId = bookId;
          delete formData.title;
          try {
            if (journeyRecord.id) {
              formData.id = journeyRecord.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowRecordForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            journeyRecord.id ? "Edit" : "Create"
          } a record`}</Modal.Title>
          <CloseButton onClick={() => setShowRecordForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create schedule</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              required
              defaultValue={
                journeyRecord.date ? journeyRecordDateToInput(journeyRecord.date) : undefined
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book</Form.Label>
            <Form.Control
              type="text "
              name="title"
              required
              // defaultValue={journeyRecord.bookId}
              onChange={(e) => setBookTitle(e.target.value)}
              onBlur={() => fetchBookIdByTitle(title)}
            />
          </Form.Group>
      
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount of pages</Form.Label>
            <Form.Control
              type="number"
              name="pages"
              required
              defaultValue={journeyRecord.pages}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount of time spent in minutes</Form.Label>
            <Form.Control
              type="number"
              name="timeSpend"
              required
              defaultValue={journeyRecord.timeSpend}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRecordForm(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {journeyRecord.id ? "Edit" : "Create"}
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

function journeyRecordDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default RecordForm;