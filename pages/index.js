import Link from 'next/link'

export default function Index() {
    return (
        <div>
            <h1>MCCS Admin</h1>
            <Link href="/login">
                <a title="Login">Login</a>
            </Link>
            {' - '}
            <Link href="/categories">
                <a title="Categories">Categories</a>
            </Link>
        </div>
    )
}