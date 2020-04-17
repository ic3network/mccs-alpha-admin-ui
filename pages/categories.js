import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'

export default function Categories() {
    const fetcher = url => fetch(url).then(r => r.json())
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