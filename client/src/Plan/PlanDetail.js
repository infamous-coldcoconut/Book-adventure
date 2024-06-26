function PlanDetail({ readingPlan }) {
    return (
        <div>
            <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
                <div style={RecordStyle()}>Total pages to read:{readingPlan.totalPages}</div>
                <div style={RecordStyle()}>Total books to read:{readingPlan.totalBooks}</div>
            </div>
        </div>
)
    ;

    function RecordStyle() {
        return {
            position: "relative",
            fontSize: "22px",
            display: "flex",
            width: "33%",
            height: "30px",
            textAlign: "center",
            justifyContent: "center",
        }
    }
}

export default PlanDetail;



