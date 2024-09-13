import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState();

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  //local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};