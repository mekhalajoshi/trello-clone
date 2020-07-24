import React from 'react';
import { useSelector } from 'react-redux';
import GuestBoard from './GuestBoard';
import UserBoard from './UserBoard';

export default function Board() {
  const user = useSelector((state) => state.login.user);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);


  return (
    <div>
      {isAuthenticated && (
        user.username === 'guest'
          ? <GuestBoard isAuthenticated={isAuthenticated} />
          : <UserBoard isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
}
