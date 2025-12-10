import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-don";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage({
  handleOnSubmit,
  postResponse,
  formData,
}) {
  //States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  //Handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-user", {
        ...formData,
      });
      setPostResponse(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  const navigate = useNavigate();
  return (
    <div>
      <h3>Create a New User</h3>
      <FormComponent
        FormData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <p>{postResponse}</p>
      <Link to="/">Back to Login Page</Link>
    </div>
  );
}
