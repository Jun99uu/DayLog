import { Navigate } from "react-router-dom";

function PrivateRoute({ children, isLogined }) {
  return isLogined ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
