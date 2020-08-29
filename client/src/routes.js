import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Links from "./pages/Links"
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Auth from "./pages/Auth";

export const useRoutes = isAuth => {
    return (
        isAuth
            ? <Switch>
                <Route path="/links" exact component={Links}/>
                <Route path="/create" exact component={Create}/>
                <Route path="/detail/:id" component={Detail}/>
                <Redirect to='/create'/>
            </Switch>
            : <Switch>
                <Route path="/" exact component={Auth}/>
                <Redirect to='/'/>
            </Switch>
    )
}