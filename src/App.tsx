import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./Hooks/auth.hook"
import {AuthContext} from "./Context/AuthContext"
import 'materialize-css'
import {Header} from "./Component/Header";

function App() {
    const {token, login, logout} = useAuth()
    const isAuthenticated:boolean = !!token

    const routes = useRoutes(isAuthenticated);

    return <AuthContext.Provider
        value={{token, isAuthenticated, login, logout}}>
        <Router>
            {isAuthenticated && <Header/>}
            <div className='routes'>
                {routes}
            </div>
        </Router>
    </AuthContext.Provider>
}

export default App;
