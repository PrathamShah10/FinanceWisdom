import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
const PrivateRoute = ({
  element: Element,
  isBuisness = false,
  props,
}: PrivateRouteProps) => {
  console.log("buisness hai", isBuisness);
  const navigate = useNavigate();
  let isAuthenticated = localStorage.getItem("token") !== null;
  if (isBuisness) {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { isCustomer } = JSON.parse(userData);
      isAuthenticated = isCustomer === false;
    }
  }

  if (!isAuthenticated) {
    navigate("/");
  }
  return isAuthenticated ? <Element {...props} /> : <SignIn />;
};
type PrivateRouteProps = {
  element: ComponentType<any>;
  isBuisness?: boolean;
  props?: any;
};
export default PrivateRoute;
