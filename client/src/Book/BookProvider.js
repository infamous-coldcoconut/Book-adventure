import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { BookContext } from "./BookContext.js";

function BookProvider({ children }) {
  const [bookLoadObject, setBookLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBookLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/book/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
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
  const value = {
    book: bookLoadObject.data,
  };

  return (
    <BookContext.Provider value={value}>{children}</BookContext.Provider>
  );
}

export default BookProvider;