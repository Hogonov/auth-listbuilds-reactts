import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {Auth} from './Pages/Auth/Auth'
import {ListBuild} from './Pages/ListBuilds/ListBuild'


export const useRoutes = (isAuthenticated:boolean) => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/list_build" exact>
                    <ListBuild/>
                </Route>
                <Redirect to="/list_build"/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <Auth/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
};
