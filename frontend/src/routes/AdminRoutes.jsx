/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);

  if (user && user.role === 'admin') {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
