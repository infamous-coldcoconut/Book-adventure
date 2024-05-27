import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import RecordDetail from "./RecordDetail";
import RecordDateTimeBadge from "./RecordDateTimeBadge";

import Icon from "@mdi/react";
import {mdiPencil, mdiTrashCanOutline, mdiBookEdit } from "@mdi/js";

function PlanCard({ journeyRecord, setShowRecordForm, setShowConfirmDeleteDialog2 }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <RecordDateTimeBadge journeyRecord={journeyRecord} />
      <RecordDetail journeyRecord={journeyRecord} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setShowRecordForm(journeyRecord)} size={"sm"} style={buttonStyle()}>
            <Icon path={mdiBookEdit} size={0.7} />
        </Button>

        <Button
            onClick={() => setShowConfirmDeleteDialog2(journeyRecord)}
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

export default PlanCard;
