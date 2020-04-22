import Link from 'next/link'
import Layout from '../components/Layout'
import UserInfo from '../components/UserInfo'

const Index = () => {
    return (
        <Layout title="Dashboard">
            <h1>Dashboard</h1>
            <Link href="/categories">
                <a title="Categories"><h4>Categories</h4></a>
            </Link>
            <UserInfo />
        </Layout>
    )
}

export default Index
