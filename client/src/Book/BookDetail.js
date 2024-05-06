function BookDetail({ book }) {
    return (
        <div>
            <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
                <div style={RecordStyle()}>{book.title}</div>
                <div style={RecordStyle()}>{book.pages}</div>
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

export default BookDetail;