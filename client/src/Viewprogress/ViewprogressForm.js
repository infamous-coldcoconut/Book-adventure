import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";

function ViewProgressForm({ setShowViewProgressForm }) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const [showAlert, setShowAlert] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      // Simulate a delay to mimic server request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Here you can perform logic to view progress
      console.log("View progress:", formData);
      setShowViewProgressForm(false);
    } catch (error) {
      console.error(error);
      setShowAlert(error.message);
    }
    setIsPending(false);
  };

  return (
    <Modal show={true} onHide={() => setShowViewProgressForm(false)}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>View Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to view progress</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending && (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          )}

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewProgressForm(false)}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            View Progress
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

export default ViewProgressForm;
