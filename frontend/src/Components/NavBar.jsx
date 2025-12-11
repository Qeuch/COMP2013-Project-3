import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";

export default function NavBar({ quantity, goToAddProduct, handleLogout }) {
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, username</h3>
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
