import { useSelector, shallowEqual } from 'react-redux';

const useIsAuthenticated = () => {
  const userEmail = useSelector((state) => state.user.email, shallowEqual);
  return userEmail;
};
export { useIsAuthenticated };
