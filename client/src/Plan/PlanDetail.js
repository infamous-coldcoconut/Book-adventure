function PlanDetail({ readingPlan }) {
    return (
        <div>
            <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
                <div style={RecordStyle()}>{readingPlan.startDate}</div>
                <div style={RecordStyle()}>{readingPlan.endDate}</div>
                <div style={RecordStyle()}>{readingPlan.totalPages}</div>
                <div style={RecordStyle()}>{readingPlan.totalBooks}</div>
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