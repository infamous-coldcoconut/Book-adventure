import { useContext, useState } from "react";
import { BookListContext } from "./BookListContext.js"; 
import Button from "react-bootstrap/esm/Button.js";
import BookCard from "./BookCard.js"; 
import BookForm from "./BookForm.js"; 
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

function BookList() {
    const { bookList } = useContext(BookListContext); 
    const [showBookForm, setShowBookForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

    return (
    <Container>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowBookForm(true)}>
            <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
            Create a book
        </Button>
        </div>

        {!!showBookForm ? <BookForm setShowBookForm={setShowBookForm} /> : null}

        {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
            book={showConfirmDeleteDialog}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
        ) : null}

        {bookList.map((book) => (
            <BookCard 
            key={book.id} 
            book={book} 
            setShowBookForm={setShowBookForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        
            />
        ))}
    </Container>
    );
}

export default BookList;
