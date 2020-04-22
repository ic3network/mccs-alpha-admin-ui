import { useState, useContext } from 'react'
import UserContext from './UserContext'

const LoginForm = () => {
    const { login } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const authenticate = e => {
        e.preventDefault()
        if (email != '' && password != '') {
            login(email, password)
        } else {
            setMessage('Please enter your email address and password')
        }
    }

    return (
        <form className="sign-in">
            <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            {message != '' && <div className="message">{message}</div>}
            <button className="btn" onClick={e => authenticate(e)}>
                Sign In
            </button>
        </form>
    )
}

export default LoginForm
