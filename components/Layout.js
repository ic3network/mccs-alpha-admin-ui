import Head from 'next/head'

const Layout = props => {
    return (
        <div className="content-wrapper">
            <Head>
                <title>{props.title ? `MCCS Admin | ${props.title}` : 'MCCS Admin'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>

            <div className="main-content">
                {props.children}
            </div>
        </div>
    )
}

export default Layout
