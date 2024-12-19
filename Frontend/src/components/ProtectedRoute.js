import { useNavigate, Navigate } from 'react-router-dom';
import {useEffect} from 'react';
export default function ProtectedRoute({ component: Component, ...rest }) {

  const navigate = useNavigate();

  useEffect(() => {
    function checkToken(){
      const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signin');
    }
    }
    checkToken();
      },[navigate])

      const token = localStorage.getItem('jwt');
  return token ? <Component {...rest} /> : <Navigate to="/signin" />;
  
}
