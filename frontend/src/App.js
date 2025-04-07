import React from "react";
import { Router, Routes, Route } from "react-router";
import Home from "./Home/Login";
import Feed from "./Home/Feed";
import InsertUser from "./Insert/UserCreate";
import UserDisplay from "./Display/UserDisplay";
import DeleteUser from "./Delete/Delete"
import UpdateUser from "./Update/UpdateUser";
import Style from "./Style/Style";

function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/insertUser" element={<InsertUser />} />
          <Route path="/userDisplay" element={<UserDisplay />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/UpdateUser/:id" element={<UpdateUser />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
