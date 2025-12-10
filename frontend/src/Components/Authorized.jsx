import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Authorized({user}) {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("user") !== null;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/not-authorized");
        }
    },
        [isLoggedIn, navigate]);

        if (!isLoggedIn) return null;

        return user;
}

export default Authorized;