import { useContext } from "react";
import { ViewprogressContext } from "./ViewprogressContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";




import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function ViewprogressRoute({ setShowViewprogressForm }) {
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
            <Button onClick={() => setShowViewprogressForm(Viewprogress)} size={"sm"}>
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

export default ViewprogressRoute;