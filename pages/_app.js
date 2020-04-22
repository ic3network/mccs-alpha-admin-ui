import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import loginAdmin from '../modules/login'

export default class MyApp extends App {
    state = {
        jwt: null
    }

    componentDidMount = () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            this.setState({
                jwt
            })
        } else {
            Router.push('/login')
        }
    }

    login = (email, password) => {
        loginAdmin(email, password, 'http://localhost:8080/api/v1/admin/login').then(jwt => {
            localStorage.setItem('jwt', JSON.stringify(jwt.data.token))
            this.setState(
                {
                    jwt: jwt.data.token
                },
                () => {
                    Router.push('/')
                }
            )
        })
    }

    logout = () => {
        // TODO - add logoutAdmin
        localStorage.removeItem('jwt')
        this.setState({
            jwt: null
        })
        Router.push('/login')
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <UserContext.Provider value={{ jwt: this.state.jwt, login: this.login, logout: this.logout }}>
                <Component {...pageProps} />
            </UserContext.Provider>
        )
    }
}