import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import UserContext from '../components/UserContext'
import loginAdmin from '../modules/login'

function MyApp(props) {
    const [jwt, setJwt] = useState(null)

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            setJwt({
                jwt
            })
        } else {
            Router.push('/login')
        }
    }, [])

    const login = (email, password) => {
        loginAdmin(email, password, 'http://localhost:8080/api/v1/admin/login').then(jwt => {
            localStorage.setItem('jwt', JSON.stringify(jwt.data.token))
            setJwt(
                jwt.data.token
            )
        }).
            then(
                () => {
                    Router.push('/')
                }
            )
    }

    const logout = () => {
        // TODO - add logoutAdmin
        localStorage.removeItem('jwt')
        setJwt({
            jwt: null
        })
        Router.push('/login')
    }

    const { Component, pageProps } = props

    return (
        <UserContext.Provider value={{ jwt: jwt, login: login, logout: logout }}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

export default MyApp
