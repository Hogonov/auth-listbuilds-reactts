import {createContext} from 'react'


export const AuthContext = createContext({
    token: '',
    login: (token:any) => {},
    logout: () => {},
    isAuthenticated: false
});
