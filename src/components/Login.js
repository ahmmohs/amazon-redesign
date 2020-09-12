import React, { useState } from 'react';

import '../styles/login.css';
import Button from './Buttons/Button';

function Login ({}) {
  const [signingUp, setSigningUp] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    emailChanged: false,
    emailValid: false,
    password: '',
    fName: '',
    lName: ''
  });

  /** Handle input change and update state */
  const handleChange = (e, key) => {
    /* Validate email */
    if (key === 'email') {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          e.target.value,
        )
      ) {
        setFormData({...formData, [key]: e.target.value, emailChanged: true, emailValid: true});
      } else {
        setFormData({...formData, [key]: e.target.value, emailChanged: true, emailValid: false});
      }
    } else {
      setFormData({...formData, [key]: e.target.value});
    }
    checkComplete();
  }

  /** Checks if they are ready to signup / login */
  const checkComplete = () => {
    if (
      formData.emailValid
      && formData.password
      && (signingUp ? (formData.fName && formData.lName) : true)
    ) {
      return true;
    }
    return false;
  }

  /** Handle form submission */
  const handleSubmit = () => {
    if (!checkComplete()) {
      setError('Form incomplete or invalid email!');
      return;
    }

    setError('');
    /** Register user */
    if (signingUp) {
      

    /** Login */
    } else {

    }
  }

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <div className="login__right">
          <div className="login__subheader login__subheader--bold">{signingUp ? 'Sign up' : 'Log in'}</div>
          <div className="input__description">Email</div>
          <input
            type="text"
            value={formData.email}
            className={formData.emailChanged ? (!formData.emailValid ? 'input input--error' : 'input') : 'input'}
            placeholder="example@email.com"
            onChange={(e) => handleChange(e, 'email')}
          />
          <div className="input__description">Password</div>
          <input
            type="password"
            className="input"
            placeholder="mypassword123"
            onChange={(e) => handleChange(e, 'password')}
            style={!signingUp ? {marginBottom: '16px'} : {marginBottom: '0px'}}
          />
          {
            signingUp &&
              (
                <div style={{width: '100%'}}>
                  <div className="input__description">First Name</div>
                  <input
                    type="text"
                    className="input"
                    placeholder="John"
                    onChange={(e) => handleChange(e, 'fName')}
                  />
                  <div className="input__description">Last Name</div>
                  <input
                    type="text"
                    className="input"
                    placeholder="Doe"
                    onChange={(e) => handleChange(e, 'lName')}
                    style={signingUp ? {marginBottom: '16px'} : {marginBottom: '0px'}}
                  />
                </div>
              )
          }
          <Button text={signingUp ? 'Sign up' : 'Log in'} color="orange" onClick={handleSubmit} />  
          <div style={error ? {marginTop: '16px'} : {marginTop: '0px'}}className="error__message">{error}</div>
          <div className="signup__text">
            Don't have an account?
            <span className="signup__link" onClick={() => {setSigningUp(true);}}>Sign up.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;