import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children, authentication = true }) => {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authStatus === undefined) return; // still loading

    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
  }, [authStatus, authentication, navigate]);

  if (authStatus === undefined) {
    return <p className='text-4xl text-center'>Loading ...</p>;
  }

  return children;
};

export default Protected;
