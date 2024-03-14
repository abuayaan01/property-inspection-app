import React, {createContext, useContext, useState, useEffect} from 'react';
import {AsyncStorage} from '@react-native-async-storage/async-storage'

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
