import 'bootstrap/dist/css/bootstrap.min.css';

import { useContext, useState } from "react";
import { PlanListContext } from "./PlanListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function PlanForm({ setShowPlanForm, readingPlan }) {
  const { state, handlerMap } = useContext(PlanListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowPlanForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          formData.startDate = new Date(formData.startDate).toISOString();
          formData.endDate = new Date(formData.endDate).toISOString();
          try {
            if (readingPlan.id) {
              formData.id = readingPlan.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowPlanForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            readingPlan.id ? "Edit" : "Create"
          } a plan`}</Modal.Title>
          <CloseButton onClick={() => setShowPlanForm(false)} />
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
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startDate"
              required
              defaultValue={
                readingPlan.startDate ? readingPlanDateToInput(readingPlan.startDate) : undefined
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDate"
              required
              defaultValue={
                readingPlan.endDate ? readingPlanDateToInput(readingPlan.endDate) : undefined
              }
            />
          </Form.Group>
      
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount of pages</Form.Label>
            <Form.Control
              type="number"
              name="totalPages"
              required
              defaultValue={readingPlan.totalPages}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount of books</Form.Label>
            <Form.Control
              type="number"
              name="totalBooks"
              required
              defaultValue={readingPlan.totalBooks}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPlanForm(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {readingPlan.id ? "Edit" : "Create"}
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

function readingPlanDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default PlanForm;