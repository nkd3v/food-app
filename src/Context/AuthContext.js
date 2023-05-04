import { createContext, useReducer } from 'react';

export const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            document.cookie = `access_token=${action.payload.token};SameSite=None;Secure;"`

            return { isAuthenticated: true, user: action.payload.user, token: action.payload }
        case 'LOGOUT':
            localStorage.removeItem("user");
            document.cookie = `access_token=;SameSite=None;Secure;"`
            return {
              isAuthenticated: false,
              user: null,
              token: null,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState, () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = document.cookie.split(';').find(cookie => cookie.includes('access_token'))?.split("=")[1]
        console.log({user, token})
        if (user && token) {
            return { isAuthenticated: true, user, token }
        }
        return initialState
    })

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}