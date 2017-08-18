import React from 'react';

const SignIn = (props)=>{
  return (
    <div className="signin">
      <h4> Welcome! Sign in with your JobCoin Address </h4>
      <p> JobCoin Address </p>
      <input type="text" name={'address'} onChange={props.onChange} value={props.address}/>
      <button className="button" onClick={props.handleGetRequest}>Sign In </button>
    </div>
  )
};

export default SignIn;