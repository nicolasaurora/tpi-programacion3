import { useState } from "react";
import { AuthenticationContext } from "./auth.context";
import { getUserRole } from "../auth/auth.helpers";
import { TOKEN_KEY } from "./config";


export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))

    const role = getUserRole(token)

    const handleUserLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token)
        setToken(token)
    }

    const handleUserLogout = () => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
    }

    return (
        <AuthenticationContext value={{ token, role, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext>
    )
}