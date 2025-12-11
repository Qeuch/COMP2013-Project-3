import Cookies from "js-cookie";

export default function PrivatePage({children}){
    const token = Cookies.get("jwt-authorization");

    if (!token) {
        return <NotAuthorized/>;
    }
    return children;
}