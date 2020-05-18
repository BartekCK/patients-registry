import React, { useEffect } from 'react';
import { authReducer, LOGIN } from './reducer';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const AuthContextProvider = (props) => {
  const [authState, dispatch] = React.useReducer(authReducer, initialState);

  useEffect(() => {
    const searchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = {};
          user.token = token;
          dispatch({ type: LOGIN, user: { ...user } });
        } catch (e) {
          console.log(e);
        }
      }
    };
    searchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        dispatch: dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
