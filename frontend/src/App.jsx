import "./App.css";
//import products from "./data/products";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import HomePage from ".Components/HomePage.jsx";
import CreateUser from ".Components/CreateUser.jsx";
import Main from ".Components/Main.jsx";
import AddProduct from ".Components/AddProduct.jsx";
import EditProduct from ".Components/EditProduct.jsx";
import NotAuthorized from ".Components/NotAuthorized.jsx";
import PageNotFound from ".Components/PageNotFound.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="create-user" element={<CreateUser/>} />
          <Route path="main" element={<Main/>} />
          <Route path="add-product" element={<AddProduct/>} />
          <Route path="edit-product" element={<EditProduct/>} />
          <Route path="not-authorized" element={<NotAuthorized/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
