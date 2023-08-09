import { faL } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const fakeAuth = true;

  if (!fakeAuth) return <Navigate to={'/login'} />;

  return props.children;
};

export default ProtectedRoute;
