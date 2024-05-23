import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import PlanList from "./Plan/PlanList"
import UserProvider from "./User/UserProvider";
import PlanListProvider from ".//Plan/PlanListProvider";
import RecordListProvider from ".//Plan/RecordListProvider";
import RecordList from "./Plan/RecordList";
import PlanProvider from "./Plan/PlanProvider"
import ViewProgressProvider from "./Viewprogress/ViewProgressProvider";
import ViewprogressRoute from "./Viewprogress/ViewprogressRoute";

import BookListProvider from "./Book/BookListProvider";
import BookRoute from "./Book/BookRoute";
import BookList from "./Book/BookList";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <PlanListProvider>
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                  <PlanList />              
                }
              />
              <Route
                  path="/recordDetail"
                  element={
                    <PlanProvider> 
                      <RecordListProvider>
                        <RecordList />
                      </RecordListProvider>
                    </PlanProvider>
                  }
                />
              <Route
                path="viewprogress"
                element={
                  <ViewProgressProvider>
                    <ViewprogressRoute />
                  </ViewProgressProvider>
                }
              />

               <Route
                path="book"
                element={
                  <BookListProvider>
                    <BookList /> 
                  </BookListProvider>
                }
              /> 
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
         </BrowserRouter>
        </PlanListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;