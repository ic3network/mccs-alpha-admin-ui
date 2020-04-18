import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import fetcher from '../libs/fetch'
import fetch from 'isomorphic-unfetch'

function PostCategories() {
    return <InputCategories />
}

function InputCategories() {
    const defaultState = {
        name: ''
    }
    const [state, setState] = useState(defaultState)

    async function handleSubmit(event) {
        event.preventDefault()
        mutate('http://localhost:8080/api/v1/admin/categories', await fetch('http://localhost:8080/api/v1/admin/categories', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODcyOTMzMDEsInVzZXJJRCI6IjVlOWFkMDIwMDA0NTkyZDRlZDIzNWY5NiIsImFkbWluIjp0cnVlfQ.pvtdJ440pe2KqbSMotxGnxvnfdgNahpFezBiUfd-gIcEDEVxBSZkYjNOaNIV2JLyBkb7217cZYdhRxoVQJAawN1gVjL2TFquZD1SDkYkUzuO9lvBUYdrrG7gN6ccagPdcgqcak1tHD3aP99HVtfYwhGIh1ZkObjpC5ddTBKLCh5LygMFzIvpAsKnkkqdSXCIUbLdr8GdMB3y41giWewpx8aCExSVpo26HDVmdkKCsNHMn-Zv7I4kz9Pw1gcSrqDwtVa46fjvV5nOChTF9_thD_rK3DLON63K1784-0rZkrNqu_rZ56rGK5J0aUSURmgrnwHmdtK8sbTC-jAHiDQf0g'
            },
            body: JSON.stringify(state)
        }))
        console.log(`category: ${state.name}`)
        setState(defaultState)
    }

    function handleChange(event) {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Category:</label>
                <input name="name" value={state.name} type="text" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

function GetCategories() {
    const { data, error } = useSWR('http://localhost:8080/api/v1/categories', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <DisplayCategories data={data} />
}

function DisplayCategories({ data }) {
    return (
        <div>
            <ol>
                {data.data.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ol>
        </div>
    )
}

export default function Categories() {
    return (
        <div>
            <PostCategories />
            <GetCategories />
        </div>
    )
}