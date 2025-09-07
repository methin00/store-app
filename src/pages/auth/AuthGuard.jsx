import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { toast } from 'react-toastify'

function AuthGuard() {
    const { user } = useSelector(state => state.account)

    if (user) return <Outlet/>
    if (!user) {
        toast.error("Öncelikle giriş yapmalısınız.")
        return <Navigate to="/login" />
    }
}

export default AuthGuard