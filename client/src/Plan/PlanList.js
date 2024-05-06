import { useContext, useState } from "react";
import { PlanListContext } from "./PlanListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import PlanCard from "./PlanCard.js";
import PlanForm from "./PlanForm.js";
import Container from "react-bootstrap/esm/Container.js";

import BookForm from "../Book/BookForm.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline} from "@mdi/js";

import ConfirmDeleteDialog from "../Book/ConfirmDeleteDialog.js";

function PlanList() {
  const { readingPlanList } = useContext(PlanListContext);
  const [showPlanForm, setShowPlanForm] = useState(false);

  const [showBookForm, setShowBookForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);


  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowPlanForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
           Create a plan
        </Button>

        <Button variant="success" onClick={() => setShowBookForm(true)}>
          <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"}/>{" "}
          Create a pičus
        </Button>
      </div>

      {!!showPlanForm ? (
        <PlanForm readingPlan={showPlanForm} setShowPlanForm={setShowPlanForm} />
      ) : null}

      {!!showBookForm ? (
        <BookForm Book={showBookForm} setShowBookForm={setShowBookForm} />
      ) : null}

      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          readingPlan={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}

      {Array.isArray(readingPlanList) && readingPlanList.map((readingPlan) => {

        return (
          <PlanCard
            key={readingPlan.id}
            readingPlan={readingPlan}
            setShowPlanForm={setShowPlanForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}

    </Container>
  );
}

export default PlanList;