import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavBar({
  quantity,
  isEditing,
  setIsEditing,
  handleOnSubmit,
  isAdmin,
}) {
  const navigate = useNavigate();

  const goToForm = () => {
    setIsEditing(false);
    navigate("/ProductForm", { state: { isEditing, handleOnSubmit } });
  };

  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, username</h3>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
        {isAdmin ? <button onClick={goToForm}>Add new product</button> : null}
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
