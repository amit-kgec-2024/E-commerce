import React from 'react'
import From from './From'

const Auth = () => {
  const isGigninPage = window.location.pathname.includes("signin");
  return (
    <div>
      <From isSigninPage={isGigninPage} />
    </div>
  );
}

export default Auth
