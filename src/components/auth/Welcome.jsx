import React from 'react';
import { useSelector } from 'react-redux';

export default function Welcome() {
  const user = useSelector((state) => state.login.user);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);


  console.log('Welcome');
  console.log(user);
  console.log(isAuthenticated);
  return (
    <section className="section auth">
      <div className="container">
        {isAuthenticated && user && (
        <p>
          Hello
            {' '}
          {user.username}
        </p>
        )}
        <p>You have successfully registered a new account.</p>
        <p>
          We have sent you a email.
          Please click on the confirmation link to verify your account.
        </p>
      </div>
    </section>
  );
}
