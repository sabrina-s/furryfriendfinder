import { useState, useEffect } from 'react';
import { ME_API } from '../constants/api';

export const useCurrentUserHook = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(ME_API, {
        method: 'GET',
        credentials: 'include'
      });

      await response.json()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return {
    currentUser,
    setCurrentUser
  };
};
