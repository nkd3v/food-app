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
        const data = await response.text()

        if (!response.ok || data === 'User not found' || data === 'Invalid password') {
            setIsLoading(false)
            setError(data.error)
        }

        if (response.ok) {
            const decodedToken = jwtBeautify(jwtDecode(data));
            let expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (6 * 60 * 60 * 1000))
            localStorage.setItem('user', JSON.stringify(decodedToken))
            document.cookie = `access_token=${data};SameSite=None;Secure;"`
            
            dispatch({type: 'LOGIN', payload: data})
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}