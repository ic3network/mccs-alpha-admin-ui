import { useState } from 'react'

function LoginForm() {
    const defaultState = {
        email: '',
        password: ''
    }
    const [state, setState] = useState(defaultState)

    function handleSubmit(event) {
        event.preventDefault()
        console.log(`email: ${state.email} | password: ${state.password}`)
        setState(defaultState)
    }

    function handleChange(event) {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input name="email" value={state.email} type="text" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input name="password" value={state.password} type="text" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}