import { useContext } from 'react'
import UserContext from './UserContext'

const UserInfo = () => {
    const { logout } = useContext(UserContext)

    return (
        <div>
            <button className="btn" onClick={logout}>
                Sign Out
            </button>
        </div>
    )
}

export default UserInfo
