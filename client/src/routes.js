import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {AuthPage} from './pages/AuthPage'
import {DetailPage} from './pages/DetailPage'
import {CreatePage} from './pages/CreatePage'
import {MainPage} from './pages/MainPage'
export const UseRoutes = (isAuthenticated, isAdmin = false) => {
    if(isAuthenticated && !isAdmin) {
        return (
            <Switch>
                <Route path = '/' exact>
                    <MainPage />
                </Route>
                <Route path = '/links' exact>
                    <LinksPage />
                </Route>
                <Route path = '/detail' exact>
                    <DetailPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }
    if(isAuthenticated && isAdmin) {
        return (
            <Switch>
                <Route path = '/' exact>
                    <MainPage />
                </Route>
                <Route path = '/links' exact>
                    <LinksPage />
                </Route>
                <Route path = '/create' exact>
                    <CreatePage />
                </Route>
                <Route path = '/detail' exact>
                    <DetailPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path = '/' exact>
                <MainPage />
            </Route>
        
            <Route path = '/auth' exact>
                <AuthPage />
            </Route>
        </Switch>
    )
}