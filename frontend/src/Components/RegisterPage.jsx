import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
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
      setPostResponse(error.response?.data?.message || "Something went wrong.");
    }
  };

  // handle submit register information
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  const navigate = useNavigate(); // i don't think this is necessary but I'm scared to touch it
  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="login"
        currentPage="create-user"
      />
      <p>{postResponse}</p>
      <Link to="/">Back to Login Page</Link>
    </div>
  );
}
