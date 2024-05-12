import { useContext, useState } from "react";
import { PlanListContext } from "./PlanListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import PlanCard from "./PlanCard.js";
import PlanForm from "./PlanForm.js";
import Container from "react-bootstrap/esm/Container.js";

import BookForm from "../Book/BookForm.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../User/UserContext";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline} from "@mdi/js";

import ConfirmDeleteDialog from "../Book/ConfirmDeleteDialog.js";

function PlanList() {
  const { readingPlanList } = useContext(PlanListContext);
  const [showPlanForm, setShowPlanForm] = useState(false);
  // const [showBookForm, setShowBookForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();


  // let filteredPlanList = readingPlanList;

  //   if (location.pathname === "/") {
  //       filteredPlanList = readingPlanList
  //   } else {
  //       // Slice the plan list
  //       filteredPlanList = readingPlanList.slice(0, 4);
  //   }

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowPlanForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
           Create a plan
        </Button>

        {/* <Button variant="success" onClick={() => setShowBookForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"}/>{" "}
          Create a book
        </Button> */}
      </div>

      {!!showPlanForm ? (
        <PlanForm readingPlan={showPlanForm} setShowPlanForm={setShowPlanForm} />
      ) : null}

      {/* {!!showBookForm ? (
        <BookForm book={showBookForm} setShowBookForm={setShowBookForm} />
      ) : null} */}

      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          readingPlan={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}

      {Array.isArray(readingPlanList) && readingPlanList.map((readingPlan) => {
      // {filteredPlanList.map((readingPlan) => {
        return (
          <PlanCard
            key={readingPlan.id}
            readingPlan={readingPlan}
            setShowPlanForm={setShowPlanForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}

      <div style={{display: 'flex', justifyContent: 'center'}}>
          {!loggedInUser ? (
              <a>Please log-in</a>
          ) : (
              location.pathname === "/" ? (
                  <Button size="sm">
                      <label>See more</label>
                  </Button>
              ) : (
                  <Button size="sm" onClick={() => navigate("/")}>
                      <label>See More</label>
                  </Button>
              )
          )}
      </div>

    </Container>
  );
}

export default PlanList;

// import { useContext, useState } from "react";
// import { PlanListContext } from "./PlanListContext.js";


// import Button from "react-bootstrap/esm/Button.js";

// import PlanForm from "./PlanForm";
// import PlanCard from "./PlanCard.js";
// import Container from "react-bootstrap/esm/Container.js";

// import ConfirmDeleteDialog from "../Book/ConfirmDeleteDialog.js";
// import {useNavigate, useLocation} from "react-router-dom";
// import {UserContext} from "../User/UserContext";

// function PlanList() {
//     const { planList } = useContext(PlanListContext);
//     const [showPlanForm, setShowPlanForm] = useState(false);
//     const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { loggedInUser } = useContext(UserContext);

//     let filteredPlanList = planList;

//     if (location.pathname === "/") {
//         filteredPlanList = planList
//     } else {
//         // Slice the plan list
//         filteredPlanList = planList.slice(0, 4);
//     }

    

//     return (
//         <Container>
//             {!!showPlanForm ? (
//                 <PlanForm plan={showPlanForm} setShowPlanForm={setShowPlanForm}/>
//             ) : null}
//             {!!showConfirmDeleteDialog ? (
//                 <ConfirmDeleteDialog
//                     plan={showConfirmDeleteDialog}
//                     setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
//                 />
//             ) : null}
//             {filteredPlanList.map((plan) => {
//                 return (
//                     <PlanCard
//                         key={plan.id}
//                         plan={plan}
//                         setShowPlanForm={setShowPlanForm}
//                         setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
//                     />
//                 );
//             })}
//             <div style={{display: 'flex', justifyContent: 'center'}}>
//                 {!loggedInUser ? (
//                     <a>Please log-in</a>
//                 ) : (
//                     location.pathname === "/TranList" ? (
//                         <Button size="sm">
//                             <label>See more</label>
//                         </Button>
//                     ) : (
//                         <Button size="sm" onClick={() => navigate("/TranList")}>
//                             <label>See More</label>
//                         </Button>
//                     )
//                 )}
//             </div>
//         </Container>
//     );
// }

// export default PlanList;