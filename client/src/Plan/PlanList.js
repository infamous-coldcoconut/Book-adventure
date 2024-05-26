import { useContext, useState } from "react";
import { PlanListContext } from "./PlanListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import PlanCard from "./PlanCard.js";
import PlanForm from "./PlanForm.js";
import Container from "react-bootstrap/esm/Container.js";

import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../User/UserContext";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline} from "@mdi/js";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function PlanList() {
  const { planList } = useContext(PlanListContext);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowPlanForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
           Create a plan
        </Button>
      </div>

      {!!showPlanForm ? (
        <PlanForm readingPlan={showPlanForm} setShowPlanForm={setShowPlanForm} />
      ) : null}

      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          readingPlan={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}

      {planList.map((readingPlan) => {
        return (
          <PlanCard
            key={readingPlan.id}
            readingPlan={readingPlan}
            setShowPlanForm={setShowPlanForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
             {!loggedInUser && <a>Please log-in</a>}
        </div>

    </Container>
  );
}

export default PlanList;
