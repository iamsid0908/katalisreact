import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Logout() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["KatalisAuth"]);

  const handleLogout = () => {
    removeCookie("KatalisAuth");
    navigate("/login");
  };

  return null; // This component doesn't render anything visible
}

export default Logout;
