import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Authorized({children, role}) {
    const navigate = useNavigate();
    const [loading, setLoading] =useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5173/check-auth", {
            method: "GET",
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data => {
            if(!data.success){
                navigate("/not-authorized");
                return;
            }
            setUserRole(data.role);
            setLoading(false);
        })
        .catch(() => {
            navigate("/not-authorized");
        });
    }, [navigate]);

    if (role && userRole !== role){
        navigate("/not-authorized");
        return null;
    }
    return children;
}

export default Authorized;