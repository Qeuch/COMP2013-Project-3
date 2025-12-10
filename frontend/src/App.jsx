import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import LoginPage from "./Components/LoginPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";
import ProductForm from "./Components/ProductForm.jsx";
import NotAuthorized from "./Components/NotAuthorized.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import Authorized from "./Components/Authorized.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<RegisterPage />} />

          <Route
            path="/main"
            element={
              //<Authorized role='admin'>
              <GroceriesAppContainer />
              //</Authorized>
            }
          />
          <Route
            path="/add-product"
            element={
              <Authorized role="admin">
                <ProductForm />
              </Authorized>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <Authorized role="admin">
                <ProductForm />
              </Authorized>
            }
          />

          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
