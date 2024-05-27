import { useContext, useState } from "react";
import { RecordListContext } from "./RecordListContext.js"; 
import Button from "react-bootstrap/esm/Button.js";
import RecordCard from "./RecordCard.js"; 
import RecordForm from "./RecordForm.js"; 
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import ConfirmDeleteDialog2 from "./ConfirmDeleteDialog2.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../User/UserContext";


function RecordList() {
    const { journeyRecordList } = useContext(RecordListContext); 
    const [showRecordForm, setShowRecordForm] = useState(false);
    const [showConfirmDeleteDialog2, setShowConfirmDeleteDialog2] = useState(false);
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
    <Container>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowRecordForm(true)}>
            <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
            Create a journeyRecord
        </Button>
        </div>

        {!!showRecordForm ? (
        <RecordForm journeyRecord={showRecordForm} setShowRecordForm={setShowRecordForm} />) : null}

        {!!showConfirmDeleteDialog2 ? (
        <ConfirmDeleteDialog2
            journeyRecord={showConfirmDeleteDialog2}
            setShowConfirmDeleteDialog2={setShowConfirmDeleteDialog2}
        />
        ) : null}

        {journeyRecordList.map((journeyRecord) => (
            <RecordCard 
                key={journeyRecord.id} 
                journeyRecord={journeyRecord} 
                setShowRecordForm={setShowRecordForm}
                setShowConfirmDeleteDialog2={setShowConfirmDeleteDialog2}
        
            />
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
             {!loggedInUser && <a>Please log-in</a>}
        </div>
        
    </Container>
    );
}

export default RecordList;