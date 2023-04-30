import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import jwtBeautify from "../Utilities/jwt-beautify"
import jwtDecode from "jwt-decode"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://api.dishdrop.pp.ua/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
        const token = await response.text()

        if (!response.ok || token === 'User not found' || token === 'Invalid password') {
            setIsLoading(false)
            setError(token.error)
        }

        if (response.ok) {
            const user = jwtBeautify(jwtDecode(token));
            dispatch({ type: 'LOGIN', payload: { isAuthenticated: true, user, token } })
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}