import { useContext } from "react";
import { ViewProgressListContext } from "./ViewProgressListContext"; 
import Container from "react-bootstrap/esm/Container.js";
import {UserContext} from "../User/UserContext";
import ViewProgressDetail from "./ViewProgressDetail";
import ViewProgressCard from "./ViewProgressCard";

function ViewProgressList() {
    const { viewProgressList } = useContext(ViewProgressListContext); 
    const { loggedInUser } = useContext(UserContext);

    const { readingPlan, journeyRecord } = viewProgressList || {};
    console.log(viewProgressList);
    
    return (
    <Container>
      <ViewProgressDetail 
        // key ={readingPlan.id}
        readingPlan = {readingPlan}
        journeyRecord = {journeyRecord}
      />

      {/* {viewProgressList.map((readingPlan
      ) => (
            <ViewProgressCard 
                readingPlan = {readingPlan}
                journeyRecord = {journeyRecord}
        
            />
        ))} */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
             {!loggedInUser && <a>Please log-in</a>}
        </div>
        
    </Container>
    );
}

export default ViewProgressList;