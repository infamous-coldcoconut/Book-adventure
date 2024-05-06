import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import PlanDetail from "./PlanDetail";
import PlanDateTimeBadge from "./PlanDateTimeBadge";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil } from "@mdi/js";

function PlanCard({ readingPlan, setShowPlanForm }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
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
          onClick={() => navigate("/planDetail?id=" + readingPlan.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>

        <Button onClick={() => setShowPlanForm(readingPlan)} size={"sm"}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>
      </div>
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

export default PlanCard;
