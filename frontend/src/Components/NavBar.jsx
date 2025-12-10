import { useNavigate } from "react-router-dom";

export default function NavBar({ quantity, isEditing }) {
  const navigate = useNavigate();

  const goToForm = () => {
    navigate("/ProductForm", setIsEditing(true));
  };

  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, username</h3>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
        {isAdmin ? <button onClick={goToForm()}>Add new product</button> : null}
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
