import React from 'react';
import './Login.css';

const Login = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Logic for social login will go here
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <p>Access your personalized content by signing in with one of the following:</p>
      <div className="social-buttons">
        <button onClick={() => handleSocialLogin('Google')}>Sign in with Google</button>
        <button onClick={() => handleSocialLogin('Facebook')}>Sign in with Facebook</button>
        <button onClick={() => handleSocialLogin('Twitter')}>Sign in with Twitter</button>
      </div>
    </div>
  );
};

export default Login;
