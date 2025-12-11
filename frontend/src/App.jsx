import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import LoginPage from "./Components/LoginPage.jsx";
import RegisterPage from "./Components/RegisterPage.jsx";
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

<<<<<<< Updated upstream
          <Route path="/add-product" element={<Authorized role="admin">
            <ProductForm handleOnSubmit={handleOnSubmit} /></Authorized>}/>

          <Route path="/edit-product/:id" element={<Authorized role="admin">
                <ProductForm handleOnSubmit={handleOnSubmit} /></Authorized>}/>
=======
          <Route
            // Changed this to /main/* as the component now has child routes
            path="/main/*" element={/*<Authorized role='admin'>*/<GroceriesAppContainer />/*</Authorized>*/}/>
>>>>>>> Stashed changes

          <Route path="/not-authorized" element={<NotAuthorized />} />

          <Route path="*" element={<PageNotFound />} />
<<<<<<< Updated upstream
          
=======

>>>>>>> Stashed changes
        </Routes>
      </Router>
    </>
  );
}

export default App;
