import { useContext, useState } from "react";
import { RecordListContext } from "./RecordListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function ConfirmDeleteDialog({ setShowConfirmDeleteDialog2, journeyRecord }) {
  const { state, handlerMap } = useContext(RecordListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowConfirmDeleteDialog2(false)}>
      <Modal.Header>
        <Modal.Title>DeleteRecord</Modal.Title>
        <CloseButton onClick={() => setShowConfirmDeleteDialog2(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Failed to create a record</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        Do you really wants to delete a record ?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmDeleteDialog2(false)}
          disabled={isPending}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isPending}
          onClick={async (e) => {
            try {
              await handlerMap.handleDelete({ id: journeyRecord.id });
              setShowConfirmDeleteDialog2(false);
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
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

export default ConfirmDeleteDialog;