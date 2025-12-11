import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function NavBar({ quantity, goToAddProduct, handleLogout }) {
  let currentUser = "Guest";

  const token = Cookies.get("jwt-authorization");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUser = decoded.username; 
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }
  
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {currentUser}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
        <button onClick={goToAddProduct}>Add new product</button>
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity.length > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
