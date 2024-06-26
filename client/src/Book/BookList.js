import { useContext, useState } from "react";
import { BookListContext } from "./BookListContext.js"; 
import Button from "react-bootstrap/esm/Button.js";
import BookCard from "./BookCard.js"; 
import BookForm from "./BookForm.js"; 
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../User/UserContext";


function BookList() {
    const { bookList } = useContext(BookListContext); 
    const [showBookForm, setShowBookForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const { loggedInUser } = useContext(UserContext);
    console.log(bookList);


    return (
    <Container>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="success" onClick={() => setShowBookForm(true)}>
            <Icon path={mdiPlusBoxOutline} size={1.5} color={"white"} />
            Create a book
        </Button>
        </div>

        {!!showBookForm ? (
            <BookForm book={showBookForm} setShowBookForm={setShowBookForm} />) : null}

        {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
            book={showConfirmDeleteDialog}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
        ) : null}

        {bookList.map((book) =>  {
          return (
            <BookCard 
                key={book.id} 
                book={book} 
                setShowBookForm={setShowBookForm}
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

export default BookList;