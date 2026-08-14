import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const login = (response) => {
    console.log("Login Response:", response);

    localStorage.setItem(
      "access",
      response.tokens.access
    );

    localStorage.setItem(
      "refresh",
      response.tokens.refresh
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    console.log(
      "Stored Access:",
      localStorage.getItem("access")
    );

    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}