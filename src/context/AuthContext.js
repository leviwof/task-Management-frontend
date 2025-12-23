import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (data) => {
        const res = await api.post("/auth/login", data);

        const token = res.data.token || res.data?.data?.token;

        if (!token) {
            throw new Error("Token missing in login response");
        }

        localStorage.setItem("token", token);
        setUser({});

        return true;
    };


    const register = async (data) => {
        await api.post("/auth/register", data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
