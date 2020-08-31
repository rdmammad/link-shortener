import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import Navbar from "./components/Navbar.component";
import "materialize-css";

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token;

    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            userId,
            isAuthenticated,
        }}>
            <BrowserRouter>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;