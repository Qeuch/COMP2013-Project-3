import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function GroceriesAppContainer() {
  /////////// States ///////////
  const [productQuantity, setProductQuantity] = useState();
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      return "";
    }
    try {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.username;
    } catch {
      return "";
    }
  });

  //////////useEffect////////

  useEffect(() => {
    handleProductsFromDB();
  }, [postResponse]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  });

  ////////Handlers//////////

  // useNavigate for new child routes
  const navigate = useNavigate();

  // function passed into navbar to navigate to edit page
  const goToAddProduct = () => {
    setIsEditing(false);
    navigate("add-product");
  };

  const initialProductQuantity = (prods) =>
    prods.map((prod) => {
      return { id: prod.id, quantity: 0 };
    });

  const handleProductsFromDB = async () => {
    try {
      await axios.get("http://localhost:3000/products").then((result) => {
        setProductList(result.data);
        setProductQuantity(initialProductQuantity(result.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((result) => {
            setPostResponse(result.data);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
    setIsEditing(true);
    setPostResponse("");

    // navigate to the proper route
    navigate(`edit-product/${product._id}`);
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/edit-product/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/");
  };

  const handleClearCart = () => {
    setCartList([]);
  };
  /////////Renderer
  // this stuff might need to be changed with routes in mind
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar
                quantity={cartList.length}
                goToAddProduct={goToAddProduct}
                handleLogout={handleLogout}
              />
              <div className="GroceriesApp-Container">
                <ProductsContainer
                  products={productList}
                  handleAddQuantity={handleAddQuantity}
                  handleRemoveQuantity={handleRemoveQuantity}
                  handleAddToCart={handleAddToCart}
                  productQuantity={productQuantity}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
                <CartContainer
                  cartList={cartList}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleAddQuantity={handleAddQuantity}
                  handleRemoveQuantity={handleRemoveQuantity}
                  handleClearCart={handleClearCart}
                />
              </div>
            </>
          }
        />
        <Route
          path="add-product"
          element={
            <ProductForm
              handleOnSubmit={handleOnSubmit}
              postResponse={postResponse}
              handleOnChange={handleOnChange}
              formData={formData}
              isEditing={isEditing}
            />
          }
        />
        <Route
          path="edit-product/:id"
          element={
            <ProductForm
              handleOnSubmit={handleOnSubmit}
              postResponse={postResponse}
              handleOnChange={handleOnChange}
              formData={formData}
              isEditing={isEditing}
            />
          }
        />
      </Routes>
    </div>
  );
}
