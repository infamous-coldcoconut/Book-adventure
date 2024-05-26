import { useContext } from "react";
import { ViewprogressContext } from "./ViewProgressContext";
import { useNavigate } from "react-router-dom";

function ViewprogressRoute({}) {
  const navigate = useNavigate();
  const { Viewprogress } = useContext(ViewprogressContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {Viewprogress ? (
        <>
          
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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

export default ViewprogressRoute;