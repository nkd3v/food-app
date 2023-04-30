import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigator = useNavigate()

    const logout = () => {
        navigator('/')
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}