// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import FormComponent from "./FormComponent";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// none of the imports were necessary here, so I removed them -- damien <3

export default function NavBar({
  quantity,
  goToAddProduct,
  handleLogout,
  currentUser,
}) {
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, {currentUser}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
        {/* Ternary for admin powers */}
        {currentUser === "admin" ? (
          <button onClick={goToAddProduct}>Add new product</button>
        ) : null}
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
