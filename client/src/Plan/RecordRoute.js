import { useContext } from "react";
import { RecordContext } from "./RecordContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import RecordDateTimeBadge from "./RecordDateTimeBadge";
import RecordDetail from "./RecordDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiBookEdit } from "@mdi/js";

function PlanRoute({setShowRecordForm }) {
  const navigate = useNavigate();
  const { journeyRecord } = useContext(RecordContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {journeyRecord ? (
        <>
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
            <Button
              onClick={() => navigate("/recordDetail?id=" + journeyRecord.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowRecordForm(journeyRecord)} size={"sm"}>
              <Icon path={mdiBookEdit} size={0.7} />
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

export default PlanRoute;