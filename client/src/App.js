import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.js";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Navbar from "./components/Navbar.js";
import Dashboard from "./components/Dashboard.js";
import { useSelector } from 'react-redux';
import NotFound from "./components/auth/NotFound.jsx";
import Create from "./components/Create.jsx";
import Edit from "./components/Edit.js";
import UpdateImage from "./components/UpdateImage.js"
import UpdateName from "./components/updateName.js";
import UpdatePassword from "./components/updatePassword.js"
import Details from "./components/Details.js"

function App() {
  const { user } = useSelector(state => state.authReducer);
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home/:page" exact element={<Home />} />
          <Route path="/details/:id" exact element={<Details />} />
          <Route path="/login" exact element={user ? <Dashboard/> : <Login/>} />
          <Route path="/register" exact element={user ? <Dashboard/> : <Register/>} />
          <Route path="/dashboard/:page" element={user ? <Dashboard/> : <Login/>} />
          <Route path="/create" exact element={user ? <Create/> : <Login/>} />
          <Route path="/update/:id" exact element={user ? <Edit/> : <Login/>} />
          <Route path="/updateImage/:id" exact element={user ? <UpdateImage/> : <Login/>} />
          <Route path="/updateName" exact element={user ? <UpdateName/> : <Login/>} />
          <Route path="/updatePassword" exact element={user ? <UpdatePassword/> : <Login/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
