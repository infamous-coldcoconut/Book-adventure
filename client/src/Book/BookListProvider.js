import { useEffect, useState, useContext } from "react";
import { BookListContext } from "./BookListContext.js";
import { UserContext } from "../User/UserContext";

function BookListProvider({ children }) {
  const [bookLoadObject, setBookLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    handleLoad();
  }, [loggedInUser]);

  async function handleLoad() {
    if (!loggedInUser) {
      setBookLoadObject({
          state: "ready",
          data: null,
      });
      return;
    }

    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/book/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      const filteredBook = responseJson.filter(book => book.userId === loggedInUser.id);

      setBookLoadObject({ state: "ready", data: filteredBook });
      return filteredBook;
    } else {
      setBookLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  

  async function handleCreate(dtoIn) {
    if (!loggedInUser) return;

    dtoIn.userId = loggedInUser.id;
    
    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/book/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBookLoadObject((current) => {
        current.data.push(responseJson);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBookLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/book/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBookLoadObject((current) => {
        const bookIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[bookIndex] = responseJson;
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBookLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/book/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBookLoadObject((current) => {
        const bookIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(bookIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBookLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: bookLoadObject.state,
    bookList: bookLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <BookListContext.Provider value={value}>
      {children}
    </BookListContext.Provider>
  );
}

export default BookListProvider;

