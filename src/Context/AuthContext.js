import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    //returns a promise:
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signup(email, password) {
    //returns a promise:
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); //once user is set then loading is finished
    }); //is automagically called by createUserWithEmailAndPassword()

    return usubscribe;
    /*the reason we use this 'unsubscribe' is that whenever we call onAuthStateChange(),
      this function returns a method that when we call this method, it will unsubscribe this on off
      state change event. So the method which is stored in 'unsubscribe' will remove the event listener
      created by onAuthStateChange() function when we unmount this component
    */
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    resetPassword,
    logout
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
