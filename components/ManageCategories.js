import { useState, useContext } from 'react'
import useSWR from 'swr'
import fetcher from '../libs/fetch'
import UserContext from './UserContext'

export default function ManageCategories() {
    const { jwt } = useContext(UserContext)
    const { data, error } = useSWR('http://localhost:8080/api/v1/categories', fetcher, { refreshInterval: 5000 })
    const defaultState = { category: '' }
    const [state, setState] = useState(defaultState)

    async function handleSubmit(event) {
        event.preventDefault()
        await fetcher('http://localhost:8080/api/v1/admin/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: '{"name" : "' + state.category + '"}'
        })
        data.data = [...data.data, state.category]
        setState(defaultState)
    }

    function handleChange(event) {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category:</label>
                <input name="category" id="category" value={state.category} type="text" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <div>
                <ol>
                    {data.data.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}