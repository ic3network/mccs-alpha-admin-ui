import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../libs/fetch'

export default function Categories() {
    const { data, error } = useSWR('http://localhost:8080/api/v1/categories', fetcher)
    const defaultState = { category: '' }
    const [state, setState] = useState(defaultState)

    async function handleSubmit(event) {
        event.preventDefault()
        await fetcher('http://localhost:8080/api/v1/admin/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc0ODA1NzUsInVzZXJJRCI6IjVlOWQ5NjI3NjNjNjI5MDIzMzlkMDFhMyIsImFkbWluIjp0cnVlfQ.VV4tFqQog7VyfAVqfWF26V0hii3p1-0Jk_2FfPJcc2GkeSyVKJ9wE2aiSOhkVjGqwMQ246MsmASdBoTltqItW5jaoy3oyUYURW5RpnQQxB_BytNHNlB-6F7W-smyeXIvhl80lztguGmUt1IWQDw5mteMBmt8PtKQ2qZMz6umGKfkBE_D_k-VFfIDdBet6SEszjPi3O2cNicFXeHyOQZcp5d7SgqT13bsJAgcLr2Ogx2R0kCYea56kilObpKFyaX3JtiWiGdOI9YqP_KtCyX2VZlnZVqhwH6VXdOthwozUacI619dMPnsdVq73D-O11iDqtPXEMX9TY6VAAOfVYbLug'
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