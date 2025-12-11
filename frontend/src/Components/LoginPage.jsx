import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import Cookies from "js-cookie";

export default function LoginPage() {
  // States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  const navigate = useNavigate();

  // Handlers
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/", formData);

      setPostResponse(response.data.message);

      if (response.status === 201) {
        navigate("/main");
        Cookies.set("jwt-authorization", response.data.token);
      }
    } catch (error) {
      setPostResponse(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="create-user"
        currentPage="login"
      />

      <p>
        Not a Member? Click <a href="/create-user">here</a> to join.
      </p>
    </div>
  );
}
