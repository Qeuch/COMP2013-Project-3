import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import HomePage from "./Components/HomePage.jsx";
import CreateUser from "./Components/CreateUser.jsx";
import ProductForm from "./Components/ProductForm.jsx";
import NotAuthorized from "./Components/NotAuthorized.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import Authorized from "./Components/Authorized.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-user" element={<CreateUser />} />

          <Route path="/main" element={<Authorized><GroceriesAppContainer /></Authorized>} />
          <Route path="/add-product" element={<Authorized><ProductForm /></Authorized>} />
          <Route path="/edit-product/:id" element={<Authorized><ProductForm /></Authorized>} />

          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
