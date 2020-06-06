import React from 'react';
import { useSelector } from 'react-redux';

export default function Welcome() {
  const user = useSelector((state) => state.login.user);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

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
        <p>Welcome to Trello!</p>
      </div>
    </section>
  );
}
