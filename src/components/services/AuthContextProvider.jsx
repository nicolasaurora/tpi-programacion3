import { useState } from "react";
import { AuthenticationContext } from "./auth.context";

const TOKEN_KEY = 'tpi-proy-prog-3'


export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))

    const handleUserLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token)
        setToken(token)
    }

    const handleUserLogout = () => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
    }

    return (
        <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext>
    )
}