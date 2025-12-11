import { useNavigate } from "react-router-dom";

export default function FormComponent({
  formData,
  handleOnChange,
  handleOnSubmit,
  postResponse,
  currentPage,
  nextPage,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>
        {currentPage === "create-user"
          ? "Create a new user"
          : "Groceries App Login"}
      </h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <button type="submit">
          {currentPage === "login" ? "Login" : "Create User"}
        </button>
      </form>
      
    </div>
  );
}
