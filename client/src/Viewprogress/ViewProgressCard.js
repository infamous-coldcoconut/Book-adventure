import ViewProgressDetail from "./ViewProgressDetail"
import PlanDateTimeBadge from "../Plan/PlanDateTimeBadge";

function ViewProgressCard({ readingPlan, journeyRecord}) {
  
  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
        <PlanDateTimeBadge readingPlan={readingPlan} />
        <ViewProgressDetail readingPlan = {readingPlan} journeyRecord={journeyRecord} /> 
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

export default ViewProgressCard;
