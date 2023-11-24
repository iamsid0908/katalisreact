import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element: Component, ...rest }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [cookies, setCookie] = useCookies(["KatalisAuth"]);
  return cookies.KatalisAuth ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
