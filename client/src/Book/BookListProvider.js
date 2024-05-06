import { useEffect, useState } from "react";
import { BookListContext } from "./BookListContext.js";

function BookListProvider({ children }) {
  const [bookLoadObject, setBookLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/book/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setBookLoadObject({ state: "ready", data: responseJson });
      return responseJson;
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
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
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
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
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
    bookState: bookLoadObject.state,
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
