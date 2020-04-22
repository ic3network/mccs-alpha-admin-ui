import fetcher from '../libs/fetch'

const login = async (email, password, loginUrl) => {
    const settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"email": "${email}", "password": "${password}"}`
    }
    try {
        const loginResp = await fetcher(loginUrl, settings)
        return loginResp
    } catch (error) {
        console.error("[LOGIN ERROR]", error)
        return error
    }
}

export default login
