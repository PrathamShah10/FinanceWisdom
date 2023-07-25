import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
const PrivateRoute = ({ element: Element, props }: PrivateRouteProps) => {
    const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;
  if(!isAuthenticated) {
    navigate("/");
  }
  return isAuthenticated ? <Element {...props} /> : <SignIn />;
};
type PrivateRouteProps = {
  element: ComponentType<any>;
  props?: any;
};
export default PrivateRoute;
