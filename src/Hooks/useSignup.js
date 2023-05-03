import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import jwtBeautify from "../Utilities/jwt-beautify"
import jwtDecode from "jwt-decode"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, password, fullName, phoneNumber, role) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://api.dishdrop.pp.ua/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, firstName: fullName, phoneNumber, role }),
            credentials: 'include',
        });
        const token = await response.text()

        if (!response.ok) {
            setIsLoading(false)
            setError(token)
        }

        if (response.ok) {
            const user = jwtBeautify(jwtDecode(token));
            dispatch({ type: 'LOGIN', payload: { isAuthenticated: true, user, token } })
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
}