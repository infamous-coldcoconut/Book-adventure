import { useContext } from "react";
import { PlanContext } from "./PlanContext";
import { RecordContext } from "./RecordContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import PlanDateTimeBadge from "./PlanDateTimeBadge";
import PlanDetail from "./PlanDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiBookEdit } from "@mdi/js";

function PlanRoute({ setShowPlanForm, setShowRecordForm }) {
  const navigate = useNavigate();
  const { readingPlan } = useContext(PlanContext);
  const { journeyRecord } = useContext(RecordContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {readingPlan ? (
        <>
          <PlanDateTimeBadge readingPlan={readingPlan} />
          <PlanDetail readingPlan={readingPlan} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("recordDetail?id=" + readingPlan.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowPlanForm(readingPlan)} size={"sm"}>
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

export default PlanRoute;